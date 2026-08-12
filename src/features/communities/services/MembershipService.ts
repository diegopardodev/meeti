import { User } from "../../auth/types";
import { MembershipPolicy } from "../policies/MembershipPolicy";
import { communityRepository, ICommunityRepository } from "./CommunityRepository";
import { IMembershipRepository, membershipRepository } from "./MembershipRepository";

class MembershipService {
    constructor(
        private membershipRepository: IMembershipRepository,
        private communityRepository: ICommunityRepository
    ) {}

    async toggleMembership(communityId: string, user: User) {
        const community = await this.communityRepository.findById(communityId);
        if (!community) return;

        const isMember = await this.membershipRepository.isMember(communityId, user.id);

        if (MembershipPolicy.canJoin(user, community, isMember)) {
            await this.membershipRepository.addMember(communityId, user.id);

            return {
                success: true,
                message: `You have joined the ${community.name} community`,
                newPermissions: {
                    canJoin: false,
                    canLeave: true
                }
            }
        }

        if (MembershipPolicy.canLeave(user, community, isMember)) {
            await this.membershipRepository.removeMember(community.id, user.id);

            return {
                success: true,
                message: `You have left the ${community.name} community`,
                newPermissions: {
                    canJoin: true,
                    canLeave: false
                }
            }
        }
    }
}

export const membershipService = new MembershipService(membershipRepository, communityRepository);