export const emailConfig = {
    from: {
        verification: "Meeti <accounts@meeti.com>",
        passwordReset: "Meeti <admin@meeti.com>",
        default: "Meeti <noreply@meeti.com>",
    },
    tokenExpiration: "1 hour",
} as const;
