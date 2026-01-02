import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { MailerConfigService } from "src/config/services/mailer-config.service";
import { resolve } from "path";
import { EjsAdapter } from "@nestjs-modules/mailer/dist/adapters/ejs.adapter";
import { EmailService } from "./email.service";
@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [MailerConfigService],
      useFactory: (mailerConfig: MailerConfigService) => ({
        transport: {
          host: mailerConfig.host,
          port: mailerConfig.port,
          secure: mailerConfig.port === 465,
          auth: {
            user: mailerConfig.user,
            pass: mailerConfig.password,
          },
        },
        defaults: {
          from: `"Easy Shop" <no-reply@easyshop.com>`,
        },
        template: {
          dir: resolve(__dirname, "templates"),
          adapter: new EjsAdapter(),
          options: { strict: false },
        },
      }),
    }),
  ],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
