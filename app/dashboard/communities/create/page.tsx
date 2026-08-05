import { Metadata } from "next";
import Link from "next/link";
import Heading from "@/src/shared/components/typography/Heading";
import { generatePageTitle } from "@/src/shared/utils/metadata";
import CreateCommunity from "@/src/features/communities/components/CreateCommunity";

export const metadata: Metadata = {
    title: generatePageTitle("Create a community")
}

export default function CreateCommunityPage() {
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
