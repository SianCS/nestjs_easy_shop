import { Injectable } from "@nestjs/common";
import { Image } from "generated/prisma";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class ImageService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: {
    url: string;
    publicId: string;
    owner: string;
    ownerId: string;
  }): Promise<void> {
    await this.prisma.image.create({ data });
  }

  async delete(owner: string, ownerId: string): Promise<void> {
    await this.prisma.image.deleteMany({
      where: { owner, ownerId },
    });
  }

  async find(owner: string, ownerId: string): Promise<Image[]> {
    return this.prisma.image.findMany({
      where: { owner, ownerId },
    });
  }
}
