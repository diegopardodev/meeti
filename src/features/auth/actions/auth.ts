"use server";

import { SignUpSchema, type SignUpInput } from "../schemas/authSchema";
import { authService } from "../services/AuthService";

export async function signUpAction(input: SignUpInput) {
    const data = SignUpSchema.safeParse(input);

    if (!data.success) {
        return {
            error: "There was an error",
            success: ""
        }
    }

    const response = await authService.register(data.data);
    return response;
}