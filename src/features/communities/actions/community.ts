"use server";

import { getServerSession } from "@/src/lib/auth-server";
import { CommunityInput, CommunitySchema } from "../schemas/community";
import { communityService } from "../services/CommunityService";

export async function createCommunityAction(input: CommunityInput) {
    const session = await getServerSession();

    if (!session) {
        return {
            error: "Unauthorized",
            success: ""
        }
    }

    const data = CommunitySchema.safeParse(input);

    if (!data.success) {
        return {
            error: "There was an error",
            success: ""
        }
    }

    await communityService.createCommunity(data.data, session.user.id);

    return {
        error: "",
        success: "Community created successfully"
    }
}

export async function editCommunityAction(input: CommunityInput, communityId: string) {
    const session = await getServerSession();

    if (!session) {
        return {
            error: "Unauthorized",
            success: ""
        }
    }

    const data = CommunitySchema.safeParse(input);

    if (!data.success) {
        return {
            error: "There was an error",
            success: ""
        }
    }

    await communityService.updateCommunity(data.data, communityId, session.user);

    return {
        error: "",
        success: "Community updated successfully"
    }
}