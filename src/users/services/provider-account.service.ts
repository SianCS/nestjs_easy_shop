import { Injectable } from "@nestjs/common";
import { ProviderAccount } from "generated/prisma";
import {
  Provider,
  ProviderType,
} from "src/common/constants/provider-account.constant";
import { PrismaService } from "src/database/prisma.service";

@Injectable()
export class ProviderAccountService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: {
    userId: string;
    provider: Provider;
    providerId: string;
    type: ProviderType;
  }): Promise<ProviderAccount> {
    return this.prisma.providerAccount.create({
      data,
    });
  }
}
