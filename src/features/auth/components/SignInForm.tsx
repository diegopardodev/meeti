"use client";

import { Form, FormInput, FormLabel, FormSubmit } from "@/src/shared/components/forms";

export default function SignInForm() {
    return (
        <Form>
            <FormLabel htmlFor="email">E-mail</FormLabel>
            <FormInput
                type="email"
                id="email"
                placeholder="Enter your e-mail"
            />

            <FormLabel htmlFor="password">Password</FormLabel>
            <FormInput
                type="password"
                id="password"
                placeholder="Enter your password"
            />

            <FormSubmit value="Sign In" />
        </Form>
    )
}
