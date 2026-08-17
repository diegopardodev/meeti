import { User } from "../../auth/types";
import { INotificationService, notificationService } from "../../notifications/services/NotificationService";
import { CommunityPolicy } from "../policies/CommunityPolicy";
import { MembershipPolicy } from "../policies/MembershipPolicy";
import { communityRepository, ICommunityRepository } from "./CommunityRepository";
import { IMembershipRepository, membershipRepository } from "./MembershipRepository";

class MembershipService {
    constructor(
        private membershipRepository: IMembershipRepository,
        private communityRepository: ICommunityRepository,
        private notificationService: INotificationService
    ) {}

    async toggleMembership(communityId: string, user: User) {
        const community = await this.communityRepository.findById(communityId);
        if (!community) return;

        const isMember = await this.membershipRepository.isMember(communityId, user.id);

        if (MembershipPolicy.canJoin(user, community, isMember)) {
            await this.membershipRepository.addMember(communityId, user.id);

            await this.notificationService.createAndNotify({
                userId: community.createdBy,
                actorName: user.name,
                message: "Joined your community",
                target: community.name
            });

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

    async getJoinedCommunities(user: User) {
        const joined = await this.membershipRepository.findJoinedCommunities(user.id);

        const enriched = await Promise.all(joined.map(async ({community}) => {
            const isMember = true;
            const isAdmin = CommunityPolicy.isAdmin(user, community);
            const memberCount = await this.membershipRepository.getMemberCount(community.id);

            return {
                data: community,
                memberCount,
                context: {
                    isMember,
                    isAdmin
                },
                permissions: {
                    canEdit: CommunityPolicy.canEdit(user, community),
                    canDelete: CommunityPolicy.canDelete(user, community),
                    canJoin: MembershipPolicy.canJoin(user, community, isMember),
                    canLeave: MembershipPolicy.canLeave(user, community, isMember),
                    canViewMembers: CommunityPolicy.canViewMembers(user, community)
                }
            }
        }));

        return enriched;
    }
}

export const membershipService = new MembershipService(membershipRepository, communityRepository, notificationService);