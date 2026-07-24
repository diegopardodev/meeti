import { Metadata } from "next";
import Link from "next/link";
import Heading from "@/src/shared/components/typography/Heading";
import { generatePageTitle } from "@/src/shared/utils/metadata";
import SignUpForm from "@/src/features/auth/components/SignUpForm";

export const metadata: Metadata = {
  title: generatePageTitle("Sign Up")
}

export default function SignUpPage() {
  return (
    <>
      <Heading>Sign Up</Heading>
      <SignUpForm />

      <nav className="mt-10 flex justify-between">
        <Link href="/auth/sign-in" className="font-bold">
          Sign In
        </Link>

        <Link href="/auth/forgot-password" className="font-bold">
          Forgot Password
        </Link>
      </nav>
    </>
  )
}