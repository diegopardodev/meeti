import { User } from "../../auth/types";
import { SelectCommunity } from "../types";

export class MembershipPolicy {
    static canJoin(user: User, community: SelectCommunity, isMember: boolean) {
        if (isMember) return false;
        if (user.id === community.createdBy) return false;

        return true;
    }

    static canLeave(user: User, community: SelectCommunity, isMember: boolean) {
        if (user.id === community.createdBy) return false;
        return isMember;
    }
}