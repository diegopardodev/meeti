import { Suspense, use } from "react";
import { FormLabel, FormSelect } from "@/src/shared/components/forms";
import Spinner from "@/src/shared/components/ui/Spinner";

const communitiesPromise = fetch("/api/user/communities").then(res => res.json());

function CommunityOptions() {
    const communities = use<{id: string; name: string}[]>(communitiesPromise);

    return (
        <>
            <FormLabel>Meeti community</FormLabel>
            <FormSelect>
                <option value="">Select a community</option>
                {communities.map(community => (
                    <option key={community.id} value={community.id}>{community.name}</option>
                ))}
            </FormSelect>
        </>
    )
}

export default function CommunityFormField() {
    return (
        <Suspense fallback={<Spinner />}>
            <CommunityOptions />
        </Suspense>
    );
}
