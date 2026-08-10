"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Form, FormError } from "@/src/shared/components/forms";
import { useCommunityStore } from "../store/community";
import { CheckPasswordInput, CheckPasswordSchema } from "../../auth/schemas/auth";
import { deleteCommunityAction } from "../actions/community";
import { revalidatePath } from "next/cache";

export default function DeleteCommunityForm() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(CheckPasswordSchema),
        mode: "all"
    });

    const { setOpen, community, setCommunity } = useCommunityStore();

    const onSubmit = async (data: CheckPasswordInput) => {
        if(!community) return;

        const { error, success } = await deleteCommunityAction(data, community.id);

        if (error) toast.error(error);
        
        if (success) {
            toast.success(success);
            setOpen(false);
            setCommunity(null);
            revalidatePath("/dasboard/communities");
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="password" className="block text-md text-slate-600">Confirm your password</label>
            <input
                id="password"
                type="password"
                className="border border-slate-200 w-full p-1"
                {...register("password")}
            />
            {errors.password && <FormError>{errors.password.message}</FormError>}

            <input
                type="submit"
                value="Delete community"
                className="inline-flex w-full justify-center bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-700 hover:cursor-pointer transition-colors ease-in-out duration-300 sm:w-auto"
            />

            <button
                type="button"
                data-autofocus
                onClick={() => { setOpen(false) }}
                className="mt-3 inline-flex w-full justify-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs inset-ring-1 inset-ring-gray-300 hover:bg-gray-50 hover:cursor-pointer transition-colors ease-in-out duration-300 sm:mt-0 sm:ml-3 sm:w-auto"
            >
                Cancel
            </button>
        </Form>
    )
}