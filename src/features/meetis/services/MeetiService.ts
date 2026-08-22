import { User } from "../../auth/types";
import { CommunityPolicy } from "../../communities/policies/CommunityPolicy";
import { communityRepository, ICommunityRepository } from "../../communities/services/CommunityRepository";
import { MeetiInput } from "../schemas/meeti";
import { IMeetiRepository, meetiRepository } from "./MeetiRepository";

class MeetiService {
    constructor(
        private meetiRepository: IMeetiRepository,
        private communityRepository: ICommunityRepository
    ) {}

    async createMeeti(data: MeetiInput, user: User) {
        const community = await this.communityRepository.findById(data.communityId);
        if (!community || !CommunityPolicy.isAdmin(user, community)) {
            throw new Error("You are not authorized to create a meeti in this community.")
        }

        await this.meetiRepository.insert({...data,  createdBy: user.id});
    }
}

export const meetiService = new MeetiService(meetiRepository, communityRepository);