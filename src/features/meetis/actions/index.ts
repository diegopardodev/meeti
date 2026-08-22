"use server";

import { getServerSession } from "@/src/lib/auth-server";
import { MeetiInput, MeetiSchema } from "../schemas/meeti";
import { meetiService } from "../services/MeetiService";

export async function createMeetiAction(input: MeetiInput) {
    const session = await getServerSession();
    if (!session) {
        return {
            error: "Not authenticated",
            success: ""
        }
    }

    const data = MeetiSchema.safeParse(input);

    if (!data.success) {
        return {
            error: "There was an error",
            success: ""
        }
    }

    await meetiService.createMeeti(data.data, session.user);

    return {
        error: "",
        success: "Meeti created successfully",
    }
}