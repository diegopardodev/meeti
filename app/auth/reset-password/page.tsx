import { Metadata } from "next";
import Link from "next/link";
import { generatePageTitle } from "@/src/shared/utils/metadata";
import Heading from "@/src/shared/components/typography/Heading";
import SetNewPassword from "@/src/features/auth/components/SetPasswordForm";

export const metadata: Metadata = {
    title: generatePageTitle("Forgot password")
}

export default function ResetPasswordPage() {
    return (
        <>
            <Heading>Reset your password</Heading>
            <SetNewPassword />

            <nav className="mt-10 flex justify-between">
                <Link href="/auth/sign-in" className="font-bold">
                    Sign In
                </Link>

                <Link href="/auth/sign-up" className="font-bold">
                    Sign Up
                </Link>
            </nav>
        </>
    )
}
