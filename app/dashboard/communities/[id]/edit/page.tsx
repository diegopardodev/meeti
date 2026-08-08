import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { communityService } from "@/src/features/communities/services/CommunityService";
import { getServerSession } from "@/src/lib/auth-server";
import Heading from "@/src/shared/components/typography/Heading";
import EditCommunity from "@/src/features/communities/components/EditCommunity";
import { generatePageTitle } from "@/src/shared/utils/metadata";

export async function generateMetadata(props: PageProps<"/dashboard/communities/[id]/edit">): Promise<Metadata> {
    const { id } = await props.params;
    const community = await communityService.getCommunity(id);

    return {
        title: generatePageTitle(`Edit community: ${community.name}`),
        description: community.description,
        openGraph: {
            title: "Share community",
            images: [
                {
                    url: community.image
                }
            ]
        }
    }
}

export default async function EditCommunityPage(props: PageProps<"/dashboard/communities/[id]/edit">) {
    const session = await getServerSession();
    if (!session) redirect("/auth/sign-in");

    const { id } = await props.params;
    const community = await communityService.getCommunityDetails(id, session.user);
    if (!community.permissions.canEdit) redirect("/dashboard/communities");

    return (
        <>
            <Heading>Edit community: { community.data.name }</Heading>
            <Link
                href="/dashboard/communities"
                className="mt-5 block lg:inline-block text-center bg-orange-500 hover:bg-orange-600 transition-colors text-sm lg:text-lg text-white py-2 px-5 font-bold"
            >Back to communities</Link>
            <EditCommunity community={community.data} />
        </>
    )
}
