"use server";

import { ForgotPasswordInput, ForgotPasswordSchema, SetPasswordInput, SetPasswordSchema, SignInInput, SignInSchema, SignUpSchema, type SignUpInput } from "../schemas/auth";
import { authService } from "../services/AuthService";

export async function signUpAction(input: SignUpInput) {
    const data = SignUpSchema.safeParse(input);

    if (!data.success) {
        return {
            error: "There was an error",
            success: ""
        }
    }

    const response = await authService.signUp(data.data);
    return response;
}

export async function signInAction(input: SignInInput) {
    const data = SignInSchema.safeParse(input);
    
    if (!data.success) {
        return {
            error: "There was an error",
            success: ""
        }
    }

    const response = await authService.signIn(data.data);
    return response;
}

export async function forgotPasswordAction(input: ForgotPasswordInput) {
    const data = ForgotPasswordSchema.safeParse(input);

    if (!data.success) {
        return {
            error: "There was an error",
            success: ""
        }
    }

    const response = await authService.requestPasswordReset(data.data);
    return response;
}

export async function setPasswordAction(input: SetPasswordInput, token: string) {
    const data = SetPasswordSchema.safeParse(input);

    if (!data.success) {
        return {
            error: "There was an error",
            success: ""
        }
    }

    const response = await authService.confirmPasswordReset(data.data, token);
    return response;
}