import { VerificationEmailData } from "../types";
import { emailConfig } from "../config";

export function renderVerificationEmail(data: VerificationEmailData): string {
    return `
        <!DOCTYPE html>
        <html>
            <head>
                <meta charset="UTF-8">
                <title>Verify your e-mail</title> 
            </head>
            <body>
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1>Welcome to Meeti</h1>
                    <p>Hi, <strong>${data.name}</strong>,</p>
                    <p>You have created your account on Meeti. Everything is almost ready — just confirm your account.</p>
                    
                    <div style="margin: 30px 0;">
                        <a 
                            href="${data.url}" 
                            style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;"
                        >
                            Confirm account
                        </a>
                    </div>
                    
                    <p style="color: #666; font-size: 14px;">
                        This link is valid for ${emailConfig.tokenExpiration}.
                    </p>
                    
                    <p style="color: #999; font-size: 12px; margin-top: 40px;">
                        If you did not create this account, you can ignore this email.
                    </p>
                </div>
            </body>
        </html>
    `
}

export function renderVerificationEmailText(data: VerificationEmailData): string {
    return `
        Hi ${data.name},
        
        You have created your account on Meeti. To confirm your account, visit the following link:
        
        ${data.url}
        
        This link is valid for ${emailConfig.tokenExpiration}.
    `
}