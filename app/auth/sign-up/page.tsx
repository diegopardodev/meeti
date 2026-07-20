import { Metadata } from "next";
import Heading from "@/src/shared/components/typography/Heading";
import { generatePageTitle } from "@/src/shared/utils/metadata";

export const metadata: Metadata = {
  title: generatePageTitle("Sign Up")
}

export default function SignUpPage() {
  return (
    <>
      <Heading>Sign Up</Heading>
    </>
  )
}