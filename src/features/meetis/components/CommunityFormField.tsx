import { Suspense, use } from "react";
import { useFormContext } from "react-hook-form";
import { FormError, FormLabel, FormSelect } from "@/src/shared/components/forms";
import Spinner from "@/src/shared/components/ui/Spinner";
import { MeetiInput } from "../schemas/meeti";

const communitiesPromise = fetch("/api/user/communities").then(res => res.json());

function CommunityOptions() {
    const { register, formState: { errors } } = useFormContext<MeetiInput>();
    const communities = use<{id: string; name: string}[]>(communitiesPromise);

    return (
        <>
            <FormLabel>Meeti community</FormLabel>
            <FormSelect
                {...register("communityId")}
            >
                <option value="">Select a community</option>
                {communities.map(community => (
                    <option key={community.id} value={community.id}>{community.name}</option>
                ))}
            </FormSelect>
            {errors.communityId && <FormError>{errors.communityId.message}</FormError>}
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
