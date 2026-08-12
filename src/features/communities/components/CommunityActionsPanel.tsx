import Link from "next/link";
import { CommunityPermissions } from "../types"
import CommunityMembership from "./CommunityMembership";

type Props = {
    permissions: CommunityPermissions;
    communityId: string;
}

export default function CommunityActionsPanel({ permissions, communityId }: Props) {
    return (
        <div className="flex justify-end">
            {permissions.canEdit && (
                <Link
                    href={`/dashboard/communities/${communityId}/edit`}
                    className="text-white font-bold px-5 py-2 text-sm md:text-base bg-orange-500 hover:bg-orange-600 hover:cursor-pointer transition-colors ease-in-out duration-300"
                >
                    Edit community
                </Link>
            )}

            {permissions.canJoin || permissions.canLeave ? (
                <CommunityMembership
                    permissions={permissions}
                    communityId={communityId}
                />
            ) : null}
        </div>
    )
}