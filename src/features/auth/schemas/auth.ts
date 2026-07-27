import z from "zod";

export const BaseAuthSchema = z.object({
    name: z.string().trim().min(1, { error: "Your name is required" }),
    email: z.email({ error: "E-mail not valid" }),
    password: z.string().trim().min(8, { error: "Your password must be at least 8 characters" }),
    passwordConfirmation: z.string().trim().min(1, { error: "You must confirm your password" })
});

export const SignUpSchema = BaseAuthSchema.pick({
    name: true,
    email: true,
    password: true,
    passwordConfirmation: true
}).refine(data => data.password === data.passwordConfirmation, {
    error: "The passwords do not match",
    path: ["passwordConfirmation"]
});

export const SignInSchema = BaseAuthSchema.pick({
    email: true
}).extend({
    password: z.string().trim().min(1, { error: "Your password is required" })
});

export type SignUpInput = z.infer<typeof SignUpSchema>;
export type SignInInput = z.infer<typeof SignInSchema>;