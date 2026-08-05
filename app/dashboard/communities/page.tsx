import { Metadata } from "next";
import Link from "next/link";
import Heading from "@/src/shared/components/typography/Heading";
import { generatePageTitle } from "@/src/shared/utils/metadata";
import MyCommunities from "@/src/features/communities/components/MyCommunities";

export const metadata: Metadata = {
    title: generatePageTitle("Manage your communities")
}

export default function CommunitiesPage() {
    return (
        <>
            <Heading>Manage your communities</Heading>

            <div className="flex items-center flex-col lg:flex-row gap-5">
                <Link
                    href="/dashboard/communities/create" 
                    className="mt-5 block lg:inline-block text-center border-2 bg-orange-500 hover:bg-orange-600 text-white transition-colors text-sm lg:text-lg py-2 px-5 font-bold"
                >Create community</Link>
                <Link
                    href="/dashboard/communities/joined" 
                    className="mt-5 block lg:inline-block text-center bg-pink-500 hover:bg-pink-600 text-white transition-colors text-sm lg:text-xl py-2 px-5  font-bold"
                >Joined communities</Link>
            </div>

            <MyCommunities />
        </>
    )
}
