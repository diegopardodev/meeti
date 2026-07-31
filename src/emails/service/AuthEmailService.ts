import { emailConfig } from "../config";
import { renderVerificationEmail, renderVerificationEmailText } from "../templates/VerificationEmail";
import { VerificationEmailData } from "../types";
import { EmailService } from "./EmailService";

export class AuthEmailService {
    static async sendVerificationEmail(data: VerificationEmailData) {
        await EmailService.send({
            from: emailConfig.from.verification,
            to: data.email,
            subject: "Verify your e-mail",
            text: renderVerificationEmailText(data),
            html: renderVerificationEmail(data)
        });
    }
}