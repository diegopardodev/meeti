import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Heading from "@/src/shared/components/typography/Heading";
import { generatePageTitle } from "@/src/shared/utils/metadata";
import { getServerSession } from "@/src/lib/auth-server";
import { membershipService } from "@/src/features/communities/services/MembershipService";
import EmptyState from "@/src/features/communities/components/EmptyState";
import CommunityItem from "@/src/features/communities/components/CommunityItem";

export const metadata: Metadata = {
    title: generatePageTitle("Joined communities")
}

export default async function JoinedCommunitiesPage() {
    const session = await getServerSession();
    if (!session) redirect("/auth/sign-in");

    const communities = await membershipService.getJoinedCommunities(session.user);

    return (
        <>
            <Heading>Joined Communities</Heading>

            <Link
                href="/dashboard/communities"
                className="mt-5 block lg:inline-block text-center bg-orange-500 hover:bg-orange-600 transition-colors text-sm lg:text-lg text-white py-2 px-5 font-bold"
            >Back to communities</Link>

            {communities.length ? (
                <ul role="list" className="divide-y divide-gray-200 mt-10 shadow-lg p-10">
                    {communities.map(community => (
                        <CommunityItem key={community.data.id} community={community} />
                    ))}
                </ul>
            ):  <EmptyState section="joined" />}
        </>
    )
}
