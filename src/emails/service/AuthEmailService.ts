import { emailConfig } from "../config";
import { renderPasswordResetEmail, renderPasswordResetEmailText } from "../templates/PasswordResetEmail";
import { renderVerificationEmail, renderVerificationEmailText } from "../templates/VerificationEmail";
import { PasswordResetEmailData, VerificationEmailData } from "../types";
import { EmailService } from "./EmailService";

export class AuthEmailService {
    static async sendVerificationEmail(data: VerificationEmailData) {
        await EmailService.send({
            from: emailConfig.from.verification,
            to: data.email,
            subject: "Meeti - Verify your e-mail",
            text: renderVerificationEmailText(data),
            html: renderVerificationEmail(data)
        });
    }

    static async sendResetPasswordEmail(data: PasswordResetEmailData) {
        await EmailService.send({
            from: emailConfig.from.passwordReset,
            to: data.email,
            subject: "Meeti - Reset your password",
            text: renderPasswordResetEmailText(data),
            html: renderPasswordResetEmail(data)
        });
    }
}