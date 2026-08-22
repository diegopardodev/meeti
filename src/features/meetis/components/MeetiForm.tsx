import { FormError, FormInput, FormLabel, FormTextarea, FormToggle } from "@/src/shared/components/forms";
import CommunityFormField from "./CommunityFormField";
import CategoryFormField from "./CategoryFormField";
import dynamic from "next/dynamic";
import { useFormContext } from "react-hook-form";
import { MeetiInput } from "../schemas/meeti";
import UploadImage from "@/src/shared/components/uploads/UploadImage";

const DynamicLocationPicker = dynamic(() => import("./LocationPicker"), { ssr: false });

export default function MeetiForm() {
    const { register, watch, formState: { errors }, setValue } = useFormContext<MeetiInput>();
    const isVirtual = watch("virtual");

    return (
        <>
            <fieldset className="space-y-3">
                <legend className="font-black text-4xl mb-5">Meeti details</legend>

                <FormLabel htmlFor="title">Meeti name</FormLabel>
                <FormInput
                    id="title"
                    type="text"
                    placeholder="Meeti name"
                    {...register("title")}
                />
                {errors.title && <FormError>{errors.title.message}</FormError>}

                <FormLabel htmlFor="details">Meeti details</FormLabel>
                <FormTextarea
                    id="details"
                    placeholder="Meeti description"
                    {...register("details")}
                />
                {errors.details && <FormError>{errors.details.message}</FormError>}

                <FormLabel>Meeti image:</FormLabel>
                <UploadImage />
                <CategoryFormField />
                <CommunityFormField />


                <FormLabel htmlFor="availableSeats">Available seats</FormLabel>
                <FormInput
                    type="number"
                    min={1}
                    id="availableSeats"
                    placeholder="Available seats"
                    {...register("availableSeats")}
                />
                {errors.availableSeats && <FormError>{errors.availableSeats.message}</FormError>}


                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div className="space-y-3">
                        <FormLabel htmlFor="date">Date:</FormLabel>
                        <FormInput
                            type="date"
                            id="date"
                            {...register("date")}
                        />
                        {errors.date && <FormError>{errors.date.message}</FormError>}
                    </div>
                    <div className="space-y-3">
                        <FormLabel htmlFor="time">Time:</FormLabel>
                        <FormInput
                            type="time"
                            step={1800}
                            id="time"
                            {...register("time")}
                        />
                        {errors.time && <FormError>{errors.time.message}</FormError>}
                    </div>
                </div>

                <FormLabel htmlFor="virtual">Virtual event?</FormLabel>
                <FormToggle
                    checked={isVirtual}
                    onChange={e => {
                        setValue("virtual", e.target.checked);
                    }}
                />
            </fieldset>
            
            {!isVirtual &&
                <fieldset className="space-y-3">
                    <legend className="font-black text-4xl mb-5">
                        Meeti location
                    </legend>

                    <FormLabel id="place_name">Place name:</FormLabel>
                    <FormInput
                        id="place_name"
                        type="text"
                        placeholder="Place name"
                        {...register("location.placeName")}
                    />
                    {"location" in errors && errors.location?.placeName && <FormError>{errors.location.placeName.message}</FormError>}
                    
                    <DynamicLocationPicker />
                </fieldset>
            }
        </>
    )
}