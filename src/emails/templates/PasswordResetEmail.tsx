import { PasswordResetEmailData } from "../types";

export function renderPasswordResetEmail(data: PasswordResetEmailData): string {

    const resetUrl = `${data.url}/auth/reset-password`

    return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Reset your password</title>
            </head>
            <body>
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1>Reset your password</h1>
                    <p>Hello <strong>${data.name}</strong>,</p>
                    <p>You requested a password reset for Meeti.</p>
                    
                    <div style="margin: 30px 0;">
                        <a 
                            href="${resetUrl}" 
                            target="_blank"
                            style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;"
                        >
                            Reset password
                        </a>
                    </div>

                    
                    <p style="color: #999; font-size: 12px; margin-top: 40px;">
                        If you did not request this change, you can ignore this email.
                    </p>
                </div>
            </body>
        </html>
    `
}

export function renderPasswordResetEmailText(data: PasswordResetEmailData): string {
    const resetUrl = `${data.url}/auth/reset-password`

    return `
    Hello ${data.name},
    
    You requested a password reset for Meeti.
    
    Visit the following link:
    ${resetUrl}
  `
}