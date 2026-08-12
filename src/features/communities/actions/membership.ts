"use server";

import { getServerSession } from "@/src/lib/auth-server";
import { membershipService } from "../services/MembershipService";

export async function toggleMembershipAction(communityId: string) {
    const session = await getServerSession();
    if (!session) throw new Error("Not authenticated");

    const response = await membershipService.toggleMembership(communityId, session.user);
    return response;
}