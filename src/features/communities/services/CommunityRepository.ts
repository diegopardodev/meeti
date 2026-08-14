import { eq } from "drizzle-orm";
import { db } from "@/src/db";
import { InsertCommunity, SelectCommunity } from "../types";
import { community } from "@/src/db/schema";
import { CommunityInput } from "../schemas/community";

export interface ICommunityRepository {
    create(data: InsertCommunity): Promise<void>;
    findByUser(userId: string, limit?: number): Promise<SelectCommunity[]>;
    findById(communityId: string): Promise<SelectCommunity | undefined>;
    update(data: CommunityInput, communityId: string): Promise<void>;
    delete(communityId: string): Promise<void>;
}

class CommunityRepository implements ICommunityRepository {
    async create(data: InsertCommunity): Promise<void> {
        await db.insert(community).values(data);
    }

    async findByUser(userId: string, limit = 10): Promise<SelectCommunity[]> {
        const communities = await db.select().from(community).where(eq(community.createdBy, userId)).limit(limit);
        return communities;
    }

    async findById(communityId: string): Promise<SelectCommunity | undefined> {
        const [result] = await db.select().from(community).where(eq(community.id, communityId)).limit(1);
        return result;
    }

    async update(data: CommunityInput, communityId: string): Promise<void> {
        await db.update(community).set({ ...data }).where(eq(community.id, communityId));
    }

    async delete(communityId: string): Promise<void> {
        await db.delete(community).where(eq(community.id, communityId));
    }
}

export const communityRepository = new CommunityRepository();