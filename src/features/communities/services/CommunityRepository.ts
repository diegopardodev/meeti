import { db } from "@/src/db";
import { InsertCommunity } from "../types";
import { community } from "@/src/db/schema";

export interface ICommunityRepository {
    create(data: InsertCommunity): Promise<void>;
}

class CommunityRepository implements ICommunityRepository {
    async create(data: InsertCommunity) {
        await db.insert(community).values(data);
    }
}

export const communityRepository = new CommunityRepository();