"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { CommunityPermissions } from "../types";
import { toggleMembershipAction } from "../actions/membership";

type Props = {
    permissions: CommunityPermissions;
    communityId: string;
}

export default function CommunityMembership({ permissions, communityId }: Props) {
    const[canJoin, setCanJoin] = useState(permissions.canJoin);

    const handleClick = async () => {
        const result = await toggleMembershipAction(communityId);

        if (result?.success) {
            toast.success(result.message);
            setCanJoin(result.newPermissions.canJoin);
        }
    }

    return (
        <>
            <button
                type="button"
                onClick={handleClick}
                className={`${canJoin ? "bg-orange-500 hover:bg-orange-600" : "bg-red-500 hover:bg-red-600"} text-sm md:text-lg font-bold w-full md:w-auto px-5 py-2 hover:cursor-pointer text-white transition-colors ease-in-out duration-300`}
            >
                {canJoin ? "Join community" : "Leave community"}
            </button>
        </>
    )
}
