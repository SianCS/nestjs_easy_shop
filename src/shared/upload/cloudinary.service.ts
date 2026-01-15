import { Injectable } from "@nestjs/common";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { CloudinaryConfigService } from "src/config/services/cloudinary-config.service";
import * as streamifier from "streamifier";

@Injectable()
export class CloudinaryService {
  constructor(private readonly cloudinaryConfig: CloudinaryConfigService) {
    cloudinary.config({
      cloud_name: cloudinaryConfig.name,
      api_key: cloudinaryConfig.apiKey,
      api_secret: cloudinaryConfig.apiSecret,
    });
  }

  uploadFile(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error || !result) {
            reject(
              error instanceof Error
                ? error
                : new Error("something went wrong from cloudinary"),
            );
            return;
          }
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  uploadMultiple(files: Express.Multer.File[]) {
    return Promise.all(files.map((file) => this.uploadFile(file)));
  }

  async delete(publicId: string) {
    await cloudinary.uploader.destroy(publicId);
  }
}
