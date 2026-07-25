"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormInput, FormLabel, FormSubmit } from "@/src/shared/components/forms";
import { type SignUpInput, SignUpSchema } from "../schemas/authSchema";
import FormError from "@/src/shared/components/forms/FormError";
import { signUpAction } from "../actions/auth";

export default function SignUpForm() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(SignUpSchema),
        mode: "all"
    });

    const onSubmit = async (data: SignUpInput) => {
        await signUpAction(data);
    }

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormLabel htmlFor="name">Name</FormLabel>
            <FormInput
                id="name"
                type="text"
                placeholder="Enter your name"
                {...register("name")}
            />
            {errors.name && <FormError>{errors.name.message}</FormError>}

            <FormLabel htmlFor="email">E-mail</FormLabel>
            <FormInput
                id="email"
                type="email"
                placeholder="Enter your e-mail"
                {...register("email")}
            />
            {errors.email && <FormError>{errors.email.message}</FormError>}

            <FormLabel htmlFor="password">Password</FormLabel>
            <FormInput
                id="password"
                type="password"
                placeholder="Password - Min. 8 characters"
                {...register("password")}
            />
            {errors.password && <FormError>{errors.password.message}</FormError>}

            <FormLabel htmlFor="password_confirmation">Repeat your password</FormLabel>
            <FormInput
                id="password_confirmation"
                type="password"
                placeholder="Password Confirmation"
                {...register("passwordConfirmation")}
            />
            {errors.passwordConfirmation && <FormError>{errors.passwordConfirmation.message}</FormError>}

            <FormSubmit value="Sign Up" />
        </Form>
    )
}
