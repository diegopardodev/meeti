import { redirect } from "next/navigation";
import { getServerSession } from "@/src/lib/auth-server";
import { communityService } from "../services/CommunityService";
import EmptyState from "./EmptyState";
import CommunityItem from "./CommunityItem";

export default async function MyCommunities() {
    const session = await getServerSession();
    if (!session) redirect("/auth/sign-in");

    const communities = await communityService.getUserCommunities(session.user);

    return (
        communities.length ? (
            <ul role="list" className="mt-10 shadow-lg p-10 divide-y divide-gray-200">
                {communities.map(community => (
                    <CommunityItem key={community.data.id} community={community} />
                ))}
            </ul>
        ) : <EmptyState section="communities" />
    )
}
