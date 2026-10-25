import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common/services/logger.service";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { BaseHttpFilter } from "./common/filters/base-http.filter";
import { GlobalValidationPipe } from "./common/pipes/global-validation.pipe";
import { AppConfigService } from "./config/services/app-config.service";
import cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());
  app.enableCors({
    origin: app.get(AppConfigService).frontendUrl,
    credentials: true,
  });

  app.useGlobalPipes(new GlobalValidationPipe());
  app.useGlobalFilters(new BaseHttpFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle("Easy Shop API")
    .setDescription("Authentication and user services for Easy Shop")
    .setVersion("1.0")
    .addBearerAuth()
    .build();
  SwaggerModule.setup("docs", app, () =>
    SwaggerModule.createDocument(app, swaggerConfig),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((err) => {
  const logger = new Logger("Bootstrap");
  logger.error("Nest application failed to start", err);
});
