import { auth } from "@/src/lib/auth";
import { SignUpInput } from "../schemas/authSchema";
import { authRepository, IAuthRepository } from "./AuthRepository";

class AuthService {
    constructor(
        private authRepository: IAuthRepository
    ) {}

    async register(credentials: SignUpInput) {
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
                password
            }
        });

        return {
            error: "",
            success: "Account created successfully, check your email."
        }
    }
}

export const authService = new AuthService(authRepository);