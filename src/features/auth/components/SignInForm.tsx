"use client";

import { useForm } from "react-hook-form";
import { redirect } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Form, FormInput, FormLabel, FormSubmit } from "@/src/shared/components/forms";
import { type SignInInput, SignInSchema } from "../schemas/auth";
import FormError from "@/src/shared/components/forms/FormError";
import { signInAction } from "../actions/auth";

export default function SignInForm() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(SignInSchema),
        mode: "all"
    });

    const onSubmit = async (data: SignInInput) => {
        const { error, success } = await signInAction(data);

        if (error) {
            toast.error(error);
        }

        if (success) {
            redirect("/dashboard");
        }
    }

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormLabel htmlFor="email">E-mail</FormLabel>
            <FormInput
                type="email"
                id="email"
                placeholder="Enter your e-mail"
                {...register("email")}
            />
            {errors.email && <FormError>{errors.email.message}</FormError>}

            <FormLabel htmlFor="password">Password</FormLabel>
            <FormInput
                type="password"
                id="password"
                placeholder="Enter your password"
                {...register("password")}
            />
            {errors.password && <FormError>{errors.password.message}</FormError>}

            <FormSubmit value="Sign In" />
        </Form>
    )
}
