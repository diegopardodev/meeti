import { communityService } from "@/src/features/communities/services/CommunityService";
import { getServerSession } from "@/src/lib/auth-server";

export async function GET() {
    const session = await getServerSession();
    if (!session) return new Response(JSON.stringify([]));

    const communities = await communityService.getCommunitiesForAPI(session.user.id);

    return new Response(JSON.stringify(communities), {
        status: 200,
        headers: {"Content-Type": "application/json"}
    });
}