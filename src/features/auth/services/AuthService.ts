import { auth } from "@/src/lib/auth";
import { SignInInput, SignUpInput } from "../schemas/auth";
import { authRepository, IAuthRepository } from "./AuthRepository";
import { APIError } from "better-auth";
import { headers } from "next/headers";

class AuthService {
    constructor(
        private authRepository: IAuthRepository
    ) {}

    async signUp(credentials: SignUpInput) {
        const { name, email, password } = credentials;

        const user = await this.authRepository.userExists(email);

        if (user) {
            return {
                error: "User already exists.",
                success: ""
            }
        }

        await auth.api.signUpEmail({
            body: {
                name,
                email,
                password,
                callbackURL: "/auth/sign-in"
            }
        });

        return {
            error: "",
            success: "Account created successfully, check your email."
        }
    }

    async signIn(credentials: SignInInput) {
        const { email, password } = credentials;

        const user = await this.authRepository.userExists(email);

        if (!user) {
            return {
                error: "User does not exists",
                success: ""
            }
        }

        try {
            await auth.api.signInEmail({
                body: {
                    email,
                    password,
                    callbackURL: "/dashboard"
                },
                headers: await headers()
            });

            return {
                error: "",
                success: ""
            }
        } catch (error) {
            if (error instanceof APIError) {
                const messages: Record<number, string> = {
                    401: "Invalid credentials"
                }

                const errorMessage = messages[error.statusCode];

                if (errorMessage) {
                    return {
                        error: errorMessage,
                        success: ""
                    }
                }
            }
        }

        return {
            error: "",
            success: ""
        }
    }
}

export const authService = new AuthService(authRepository);