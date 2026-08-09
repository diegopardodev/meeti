import Link from "next/link";
import Image from "next/image";
import { CommunityWithPermissions } from "../types"
import CommunityDropdownMenu from "./CommunityDropdownMenu";

type Props = {
    community: CommunityWithPermissions;
}

export default function CommunityItem({community}: Props) {
    const { id, name, image, description } = community.data;

    return (
        <li className="flex justify-between gap-x-6 py-5">
            <div className="flex items-start min-w-0 gap-x-4">
                <div className="size-32 flex-none overflow-hidden">
                    <Image
                        src={image}
                        alt={`Community ${name}`}
                        className="object-cover w-full h-full pointer-events-none"
                        width={250}
                        height={250}
                    />
                </div>
                <div className="min-w-0 flex-auto">
                    <Link
                        href={`/communities/${id}`}
                        className="hover:underline font-bold text-lg"
                        target="_blank"
                    >
                        {name}
                    </Link>
                    <p className="text-gray-600 text-sm line">{description}</p>
                    <p className="text-gray-600 text-sm"></p>
                </div>
            </div>
            <div className="flex shrink-0 items-center gap-x-6">
                { community.context.isAdmin && <CommunityDropdownMenu community={community.data} /> }
            </div>
        </li>
    )
}