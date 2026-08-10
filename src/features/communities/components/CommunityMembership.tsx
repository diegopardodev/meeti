"use client";

import { useState } from "react";
import { CommunityPermissions } from "../types";

type Props = {
    permissions: CommunityPermissions;
}

export default function CommunityMembership({ permissions }: Props) {
    const[canJoin, setCanJoin] = useState(permissions.canJoin);
    const[canLeave, setCanLeave] = useState(permissions.canLeave);

    return (
        <>
            {canJoin && (
                <button
                    type="button"
                    className="text-sm md:text-lg font-bold w-full md:w-auto px-5 py-2 bg-orange-500 hover:bg-orange-600 hover:cursor-pointer text-white transition-colors ease-in-out duration-300"
                >
                    Join community
                </button>
            )}

            {canLeave && (
                <button
                    type="button"
                    className="text-sm md:text-lg font-bold w-full md:w-auto px-5 py-2 bg-red-500 hover:bg-red-600 hover:cursor-pointer text-white transition-colors ease-in-out duration-300"
                >
                    Leave community
                </button>
            )}
        </>
    )
}
