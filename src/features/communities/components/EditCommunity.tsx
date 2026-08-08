"use client";

import { FormProvider, useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { CommunityInput, CommunitySchema } from "../schemas/community";
import { Form, FormSubmit } from "@/src/shared/components/forms";
import CommunityForm from "./CommunityForm";
import { SelectCommunity } from "../types";
import { editCommunityAction } from "../actions/community";

type Props = {
    community: SelectCommunity;
}

export default function EditCommunity({ community }: Props) {
    const { id, name, image, description } = community;

    const methods = useForm({
        resolver: zodResolver(CommunitySchema),
        mode: "all",
        defaultValues: {
            name,
            image,
            description
        }
    });

    const onSubmit = async (data: CommunityInput) => {
        const { error, success } = await editCommunityAction(data, id);

        if (error) toast.error(error);

        if (success) {
            toast.success(success);
            redirect("/dashboard/communities");
        }
    }

    return (
        <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
                <CommunityForm />
                <FormSubmit>
                    Edit community
                </FormSubmit>
            </Form>
        </FormProvider>
    )
}
