import { User } from "../../auth/types";
import { SelectCommunity } from "../types";

export class CommunityPolicy {
    static isAdmin(user: User, community: SelectCommunity) {
        return user.id === community.createdBy;
    }

    static canEdit(user: User, community: SelectCommunity) {
        return this.isAdmin(user, community);
    }

    static canDelete(user: User, community: SelectCommunity) {
        return this.isAdmin(user, community);
    }

    static canViewMembers(user: User, community: SelectCommunity) {
        return this.isAdmin(user, community);
    }
}