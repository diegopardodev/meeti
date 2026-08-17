import { Metadata } from "next";
import Link from "next/link";
import Heading from "@/src/shared/components/typography/Heading";

export const metadata: Metadata = {
    title: "Manage your meetis"
}

export default function MeetisPage() {
    return (
        <>
            <Heading>Manage your meetis</Heading>

            <Link
                href="/dashboard/meetis/create" 
                className="mt-5 block lg:inline-block text-center border-2 bg-orange-500 hover:bg-orange-600 text-white transition-colors text-sm lg:text-lg py-2 px-5 font-bold"
            >Create meeti</Link>
        </>
    );
}
