"use client";

import { useForm } from "react-hook-form";
import { redirect, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Form, FormInput, FormLabel, FormSubmit, FormError } from "@/src/shared/components/forms";
import { SetPasswordInput, SetPasswordSchema } from "../schemas/auth";
import Spinner from "@/src/shared/components/ui/Spinner";
import { setPasswordAction } from "../actions/auth";

export default function SetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    if (!token) redirect("/auth/forgot-password");

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(SetPasswordSchema),
        mode: "all"
    });

    const onSubmit = async (data: SetPasswordInput) => {
        const { error, success } = await setPasswordAction(data, token);

        if (error) toast.error(error);

        if (success) {
            toast.success(success);
            redirect("/auth/sign-in");
        }
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormLabel htmlFor="newPassword">New password</FormLabel>
            <FormInput
                id="newPassword"
                type="password"
                placeholder="Input your new password"
                {...register("newPassword")}
            />
            {errors.newPassword && <FormError>{errors.newPassword.message}</FormError>}

            <FormLabel htmlFor="passwordConfirmation">Password confirmation</FormLabel>
            <FormInput
                id="passwordConfirmation"
                type="password"
                placeholder="Confirm your new password"
                {...register("passwordConfirmation")}
            />
            {errors.passwordConfirmation && <FormError>{errors.passwordConfirmation.message}</FormError>}

            <FormSubmit disabled={isSubmitting} className="flex justify-center items-center gap-2">
                {isSubmitting ? <Spinner /> : "Reset password"}
            </FormSubmit>
        </Form>
    )
}
