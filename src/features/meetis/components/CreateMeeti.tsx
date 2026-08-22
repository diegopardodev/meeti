"use client"

import { redirect } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Form, FormSubmit } from "@/src/shared/components/forms";
import MeetiForm from "./MeetiForm";
import { useSession } from "@/src/lib/auth-client";
import Spinner from "@/src/shared/components/ui/Spinner";
import { MeetiInput, MeetiSchema } from "../schemas/meeti";
import { createMeetiAction } from "../actions";

export default function CreateMeeti() {
    const methods = useForm({
        resolver: zodResolver(MeetiSchema),
        mode: "all",
        defaultValues: {
            title: "",
            details: "",
            categoryId: "",
            communityId: "",
            availableSeats: 0,
            date: "",
            time: "",
            image: "",
            virtual: false,
            location: {
                placeName: "",
                address: "",
                city: "",
                country: "",
                lat: 13.697977,
                lng: -89.191150
            }
        }
    });

    const { isPending } = useSession();
    if (isPending) return <Spinner />

    const onSubmit = async (data: MeetiInput) => {
        const { error, success } = await createMeetiAction(data);

        if (error) return toast.error(error);

        toast.success(success);
        redirect("/dashboard/meetis");
    }

    return (
        <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)} noValidate>
                <MeetiForm />
                <FormSubmit>Create meeti</FormSubmit>
            </Form>
        </FormProvider>
    );
}
