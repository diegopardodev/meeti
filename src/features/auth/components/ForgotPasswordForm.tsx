"use client";

import { Form, FormInput, FormLabel, FormSubmit } from "@/src/shared/components/forms"

export default function ForgotPasswordForm() {
    return (
        <Form>
            <FormLabel htmlFor="email">E-mail</FormLabel>
            <FormInput
                id="email"
                type="email"
                placeholder="Enter your e-mail"
            />

            <FormSubmit value="Send instructions" />
        </Form>
    )
}
