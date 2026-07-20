import { Metadata } from "next";
import Heading from "@/src/shared/components/typography/Heading";
import { generatePageTitle } from "@/src/shared/utils/metadata";

export const metadata: Metadata = {
    title: generatePageTitle("Sign In")
}

export default function SignInPage() {
    return (
        <>
            <Heading>Sign In</Heading>
        </>
    )
}