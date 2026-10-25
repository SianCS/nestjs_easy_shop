import {
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Patch,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { CurrentUserDto } from "src/auth/dtos/current-user.dto";
import { DataResponse } from "src/common/types/response.type";

const MAX_PROFILE_IMAGE_BYTES = 2 * 1024 * 1024;

@ApiBearerAuth()
@Controller("users")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: { profileImage: { type: "string", format: "binary" } },
    },
  })
  @UseInterceptors(FileInterceptor("profileImage"))
  @Patch()
  async update(
    // ตรวจไฟล์ก่อนส่งขึ้น Cloudinary: ต้องมีไฟล์ เป็นรูป และไม่เกิน 2 MB
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: /^image\/(jpeg|png|webp)$/ })
        .addMaxSizeValidator({ maxSize: MAX_PROFILE_IMAGE_BYTES })
        .build({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }),
    )
    file: Express.Multer.File,
    @CurrentUser() user: CurrentUserDto,
  ): Promise<DataResponse<string>> {
    const url = await this.userService.updateProfile(user.id, file);
    return { data: url };
  }
}
