import { db } from "@/src/db";
import { InsertCommunity, SelectCommunity } from "../types";
import { community } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export interface ICommunityRepository {
    create(data: InsertCommunity): Promise<void>;
    findByUser(userId: string, limit?: number): Promise<SelectCommunity[]>;
}

class CommunityRepository implements ICommunityRepository {
    async create(data: InsertCommunity) {
        await db.insert(community).values(data);
    }

    async findByUser(userId: string, limit = 10): Promise<SelectCommunity[]> {
        const communities = await db.select().from(community).where(eq(community.createdBy, userId)).limit(limit);
        return communities;
    }
}

export const communityRepository = new CommunityRepository();