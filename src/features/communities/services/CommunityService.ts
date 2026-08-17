import { notFound } from "next/navigation";
import { User } from "../../auth/types";
import { CommunityPolicy } from "../policies/CommunityPolicy";
import { MembershipPolicy } from "../policies/MembershipPolicy";
import { CommunityInput } from "../schemas/community";
import { communityRepository, ICommunityRepository } from "./CommunityRepository";
import { checkPassword } from "@/src/shared/utils/auth";
import { deleteUTFiles } from "@/src/lib/uploadthing-server";
import { IMembershipRepository, membershipRepository } from "./MembershipRepository";

class CommunityService {
    constructor(
        private communityRepository: ICommunityRepository,
        private membershipRepository: IMembershipRepository
    ) {}

    async createCommunity(data: CommunityInput, userId: string) {
        await this.communityRepository.create({
            ...data,
            createdBy: userId
        });
    }

    async getCommunitiesForAPI(userId: string) {
        const communities = await this.communityRepository.findByUser(userId);
        return communities.map(community => ({
            id: community.id,
            name: community.name
        }));
    }

    async getUserCommunities(user: User) {
        const communities = await this.communityRepository.findByUser(user.id);

        const enriched = await Promise.all(communities.map(async community => {
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

    async getCommunity(communityId: string) {
        const community = await this.communityRepository.findById(communityId);
        if (!community) notFound();

        return community;
    }

    async getCommunityDetails(communityId: string, user?: User) {
        const community = await this.getCommunity(communityId);
        const memberCount = await this.membershipRepository.getMemberCount(community.id);

        if (!user) {
            return {
                data: community,
                memberCount,
                context: null,
                permissions: null
            }
        }

        const isMember = await this.membershipRepository.isMember(communityId, user.id);
        const isAdmin = CommunityPolicy.isAdmin(user, community);

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
    }

    async updateCommunity(data: CommunityInput, communityId: string, user: User) {
        const community = await this.getCommunity(communityId);

        if (!CommunityPolicy.canEdit(user, community)) {
            throw new Error("You can't edit this community");
        }

        await this.communityRepository.update(data, communityId);
    }

    async deleteCommunity(communityId: string, password: string, user: User) {
        const community = await this.getCommunity(communityId);

        if (!CommunityPolicy.canDelete(user, community)) throw new Error("You are not allowed to delete this community");

        const isValidPassword = await checkPassword(password);

        if (!isValidPassword) {
            return {
                error: "Password do not match",
                success: ""
            }
        }

        await this.communityRepository.delete(communityId);
        await deleteUTFiles(community.image);

        return {
            error: "",
            success: "Community deleted successfully"
        }
    }
}

export const communityService = new CommunityService(communityRepository, membershipRepository);