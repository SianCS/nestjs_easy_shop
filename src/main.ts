import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common/services/logger.service";
import { BaseHttpFilter } from "./common/filters/base-http.filter";
import { GlobalValidationPipe } from "./common/pipes/globle-validation.pipe";
import cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.useGlobalPipes(new GlobalValidationPipe());
  app.useGlobalFilters(new BaseHttpFilter());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
  const logger = new Logger("Bootstrap");
  logger.error("Nest application failed to start", err);
});
