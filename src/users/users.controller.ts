import {
  Controller,
  Patch,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UsersService } from "./users.service";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { CurrentUserDto } from "src/auth/dtos/current-user.dto";
import { DataResponse } from "src/common/types/response.type";

@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @UseInterceptors(FileInterceptor("profileImage"))
  @Patch()
  async update(
    @UploadedFile()
    file: Express.Multer.File,
    @CurrentUser() user: CurrentUserDto,
  ): Promise<DataResponse<string>> {
    const url = await this.userService.updateProfile(user.id, file);
    return { data: url };
  }
}
