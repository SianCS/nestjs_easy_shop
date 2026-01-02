import { MailerService } from "@nestjs-modules/mailer";
import { Injectable, Logger } from "@nestjs/common";

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  constructor(private readonly mailerService: MailerService) {}

  async sendConfirmationEmail(email: string, link: string): Promise<void> {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: "confirm your email to unlock your account",
        template: "confirm-email",
        context: {
          link,
        },
      });
      this.logger.log(`Confirmation email sent to ${email}`);
    } catch (error) {
      this.logger.error(
        `Failed to send confirmation email to ${email}`,
        error instanceof Error && error.stack,
      );
    }
  }
}
