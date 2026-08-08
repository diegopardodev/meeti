import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Heading from "@/src/shared/components/typography/Heading";
import { generatePageTitle } from "@/src/shared/utils/metadata";
import CreateCommunity from "@/src/features/communities/components/CreateCommunity";
import { getServerSession } from "@/src/lib/auth-server";

export const metadata: Metadata = {
    title: generatePageTitle("Create a community")
}

export default async function CreateCommunityPage() {
    const session = await getServerSession();
    if (!session) redirect("/auth/sign-in");

    return (
        <>
            <Heading>Create a community</Heading>
            <Link
                href="/dashboard/communities"
                className="mt-5 block lg:inline-block text-center bg-orange-500 hover:bg-orange-600 transition-colors text-sm lg:text-lg text-white py-2 px-5 font-bold"
            >Back to communities</Link>

            <CreateCommunity />
        </>
    )
}
