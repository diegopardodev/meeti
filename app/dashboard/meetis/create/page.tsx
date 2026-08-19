import { Metadata } from "next";
import Link from "next/link";
import Heading from "@/src/shared/components/typography/Heading";
import CreateMeeti from "@/src/features/meetis/components/CreateMeeti";
import { getServerSession } from "@/src/lib/auth-server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
    title: "Create meeti"
}

export default async function CreateMeetiPage() {
    const session = await getServerSession();
    if (!session) redirect("/auth/sign-in");

    return (
        <>
            <Heading>Create a meeti</Heading>

            <Link
                href="/dashboard/meetis" 
                className="mt-5 block lg:inline-block text-center border-2 bg-orange-500 hover:bg-orange-600 text-white transition-colors text-sm lg:text-lg py-2 px-5 font-bold"
            >Go back to meetis</Link>

            <CreateMeeti />
        </>
    );
}
