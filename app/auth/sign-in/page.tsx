import { Metadata } from "next";
import Link from "next/link";
import Heading from "@/src/shared/components/typography/Heading";
import { generatePageTitle } from "@/src/shared/utils/metadata";
import SignInForm from "@/src/features/auth/components/SignInForm";

export const metadata: Metadata = {
    title: generatePageTitle("Sign In")
}

export default function SignInPage() {
    return (
        <>
            <Heading>Sign In</Heading>
            <SignInForm />

            <nav className="mt-10 flex justify-between">
                <Link href="/auth/sign-up" className="font-bold">
                    Sign Up
                </Link>

                <Link href="/auth/forgot-password" className="font-bold">
                    Forgot Password
                </Link>
            </nav>
        </>
    )
}