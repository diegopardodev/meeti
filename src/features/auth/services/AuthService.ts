import { SignUpInput } from "../schemas/authSchema";

class AuthService {
    async register(credentials: SignUpInput) {
        console.log("From AuthService - register", credentials);
    }
}

export const authService = new AuthService();