import { CommunityInput } from "../schemas/community";
import { communityRepository, ICommunityRepository } from "./CommunityRepository";

class CommunityService {
    constructor(
        private communityRepository: ICommunityRepository
    ) {}

    async createCommunity(data: CommunityInput, userId: string) {
        await this.communityRepository.create({
            ...data,
            createdBy: userId
        });
    }
}

export const communityService = new CommunityService(communityRepository);