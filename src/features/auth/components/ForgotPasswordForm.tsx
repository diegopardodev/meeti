"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Form, FormInput, FormLabel, FormSubmit, FormError } from "@/src/shared/components/forms";
import { ForgotPasswordInput, ForgotPasswordSchema } from "../schemas/auth";
import Spinner from "@/src/shared/components/ui/Spinner";
import { forgotPasswordAction } from "../actions/auth";

export default function ForgotPasswordForm() {
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
        resolver: zodResolver(ForgotPasswordSchema),
        mode: "all"
    });

    const onSubmit = async (data: ForgotPasswordInput) => {
        const { error, success } = await forgotPasswordAction(data);

        if (error) toast.error(error);
        if (success) {
            toast.success(success);
            reset();
        };
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormLabel htmlFor="email">E-mail</FormLabel>
            <FormInput
                id="email"
                type="email"
                placeholder="Enter your e-mail"
                {...register("email")}
            />
            {errors.email && <FormError>{errors.email.message}</FormError>}

            <FormSubmit disabled={isSubmitting} className="flex justify-center items-center gap-2">
                {isSubmitting ? <Spinner /> : "Send instructions"}
            </FormSubmit>
        </Form>
    )
}
