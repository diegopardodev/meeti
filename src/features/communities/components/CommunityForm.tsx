import { useFormContext } from "react-hook-form";
import { FormInput, FormLabel, FormTextArea, FormError } from "@/src/shared/components/forms";
import { CommunityInput } from "../schemas/community";
import UploadImage from "@/src/shared/components/uploads/UploadImage";

export default function CommunityForm() {
    const { register, formState: { errors } } = useFormContext<CommunityInput>();

    return (
        <>
            <FormLabel htmlFor="name">Community name</FormLabel>
            <FormInput
                id="name"
                type="text"
                placeholder="Community title"
                {...register("name")}
            />
            {errors.name && <FormError>{errors.name.message}</FormError>}

            <FormLabel>Community Image</FormLabel>
            <UploadImage />

            <FormLabel htmlFor="description">Community description</FormLabel>
            <FormTextArea
                id="description"
                placeholder="Community description"
                {...register("description")}
            />
            {errors.description && <FormError>{errors.description.message}</FormError>}
        </>
    )
}
