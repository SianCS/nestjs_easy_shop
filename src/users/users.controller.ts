import {
  Controller,
  Patch,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Public } from "../auth/decorators/public.decorator";

@Controller("users")
export class UsersController {
  @Public()
  @UseInterceptors(FileInterceptor("profileImage"))
  @Patch()
  update(
    @UploadedFile()
    file: Express.Multer.File,
  ) {
    console.log(file);
  }
}
