import { transporter } from "@/src/lib/nodemailer";
import { EmailOptions } from "../types";

export class EmailService {
    static async send(options: EmailOptions): Promise<void> {
        try {
            const info = await transporter.sendMail(options);
            console.log("Email sent:", info.messageId);
        } catch (error) {
            console.error("Error sending the email:", error);
            throw new Error("Could not send the email");
        }
    }
}
