import { Injectable } from "@nestjs/common";
import { EmailVerificationToken, User } from "@prisma/client";
import { RegisterDto } from "src/auth/dtos/register.dto";
import {
  Provider,
  PROVIDER,
  PROVIDER_TYPE,
} from "src/common/constants/provider-account.constant";
import { PRISMA_ERROR_CODE } from "src/database/constants/prisma-error-code";
import { PrismaService } from "src/database/prisma.service";
import { BcryptService } from "src/shared/security/services/bcrypt.service";
import { EmailAlreadyExistException } from "./exceptions/email-already-exist.exception";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import { UserUpdateInput } from "./types/input.type";
import { ProviderAccount } from "generated/prisma";
import { CloudinaryService } from "src/shared/upload/cloudinary.service";
import { ImageService } from "src/shared/upload/image.service";

@Injectable()
export class UsersService {
  constructor(
    private readonly bcryptService: BcryptService,
    private readonly prisma: PrismaService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly imageService: ImageService,
  ) {}

  async createByCredentials(registerDto: RegisterDto): Promise<User> {
    registerDto.password = await this.bcryptService.hash(registerDto.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          ...registerDto,
          providerAccounts: {
            create: {
              type: PROVIDER_TYPE.CREDENTIALS,
              provider: PROVIDER.CREDENTIALS,
              providerId: registerDto.email,
            },
          },
        },
      });
      return user;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === PRISMA_ERROR_CODE.UNIQUE_CONSTRAINT_FAILED
      ) {
        throw new EmailAlreadyExistException();
      }
      throw error;
    }
  }

  update(id: string, data: UserUpdateInput): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  findByEmailIncludeVerificationToken(
    email: string,
  ): Promise<
    (User & { emailVerificationToken: EmailVerificationToken | null }) | null
  > {
    return this.prisma.user.findUnique({
      where: { email },
      include: { emailVerificationToken: true },
    });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  findByEmailIncludeProviderAccount(
    email: string,
    provider: Provider,
  ): Promise<(User & { providerAccounts: ProviderAccount[] }) | null> {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        providerAccounts: {
          where: { provider },
        },
      },
    });
  }

  createBygoogle(email: string, providerId: string): Promise<User> {
    return this.prisma.user.create({
      data: {
        email,
        emailVerified: new Date(),
        providerAccounts: {
          create: {
            provider: PROVIDER.GOOGLE,
            providerId,
            type: PROVIDER_TYPE.OAUTH,
          },
        },
      },
    });
  }

  async updateProfile(id: string, file: Express.Multer.File): Promise<string> {
    const { public_id: publicId, secure_url: url } =
      await this.cloudinaryService.uploadFile(file);

    await this.update(id, { image: url });
    const images = await this.imageService.find("user", id);
    if (images.length > 0) {
      await Promise.all(
        images.map((image) => this.cloudinaryService.delete(image.publicId)),
      );
      await this.imageService.delete("user", id);
    }
    await this.imageService.create({
      url,
      publicId,
      owner: "user",
      ownerId: id,
    });

    return url;
  }
}
