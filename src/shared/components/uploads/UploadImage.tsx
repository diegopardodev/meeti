"use client";

import { useState } from "react";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
import { useFormContext } from "react-hook-form";
import { UploadDropzone } from "@/src/shared/utils/uploadthing";
import { CommunityInput } from "@/src/features/communities/schemas/community";
import { FormError } from "../forms";

export default function UploadImage() {
    const[uploadedImage, setUploadedImage] = useState("");
    const { formState: { errors }, setValue, clearErrors, getValues } = useFormContext<CommunityInput>();

    const currentImage = getValues("image") ? getValues("image") : null;

    return (
        <>
            <UploadDropzone
                endpoint="meetiUploader"
                className="ut-button:hidden"
                onClientUploadComplete={(res => {
                    const url = res[0].ufsUrl;
                    setUploadedImage(url);
                    setValue("image", url);
                    clearErrors("image");
                })}
                appearance={{
                    label: "text-sm text-gray-500 hover:text-gray-600",
                    allowedContent: "text-sm"
                }}
                content={{
                    label: "Choose a file or drag and drop",
                    allowedContent: "Image (max. 1MB)"
                }}
                config={{
                    cn: twMerge,
                    mode: "auto"
                }}
            />

            { errors.image && <FormError>{errors.image.message}</FormError> }

            {uploadedImage && (
                <>
                    <p className="text-lg font-bold">New image:</p>
                    <Image
                        src={uploadedImage}
                        alt="Meeti Image"
                        width={300}
                        height={200}
                        loading="eager"
                        className="pointer-events-none"
                    />
                </>
            )}

            {currentImage && !uploadedImage && (
                <>
                    <p className="text-lg font-bold">Current image:</p>
                    <Image
                        src={currentImage}
                        alt="Meeti Image"
                        width={300}
                        height={200}
                        loading="eager"
                        className="pointer-events-none"
                    />
                </>
            )}
        </>
    )
}
