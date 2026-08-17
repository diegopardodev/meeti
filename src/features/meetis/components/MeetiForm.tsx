import { FormInput, FormLabel, FormTextarea, FormToggle } from "@/src/shared/components/forms";
import CommunityFormField from "./CommunityFormField";

export default function MeetiForm() {

    return (
        <>
            <fieldset className="space-y-3">
                <legend className="font-black text-4xl mb-5">Meeti details</legend>

                <FormLabel htmlFor="title">Meeti name</FormLabel>
                <FormInput
                    id="title"
                    type="text"
                    placeholder="Meeti name"
                />

                <FormLabel htmlFor="details">Meeti details</FormLabel>
                <FormTextarea
                    id="details"
                    placeholder="Meeti description"
                />

                <CommunityFormField />


                <FormLabel htmlFor="availableSeats">Available seats</FormLabel>
                <FormInput
                    type="number"
                    min={1}
                    id="availableSeats"
                    placeholder="Available seats"
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <div className="space-y-3">
                        <FormLabel htmlFor="date">Date:</FormLabel>
                        <FormInput
                            type="date"
                            id="date"
                        />

                    </div>
                    <div className="space-y-3">
                        <FormLabel htmlFor="time">Time:</FormLabel>
                        <FormInput
                            type="time"
                            step={1800}
                            id="time"
                        />
                    </div>
                </div>

                <FormLabel htmlFor="virtual">Virtual event?</FormLabel>
                <FormToggle />
            </fieldset>

            <fieldset className="space-y-3">
                <legend className="font-black text-4xl mb-5">
                    Meeti location
                </legend>

                <FormLabel id="place_name">Venue name:</FormLabel>
                <FormInput
                    id="place_name"
                    type="text"
                    placeholder="Venue name"
                />
            </fieldset>
        </>
    )
}