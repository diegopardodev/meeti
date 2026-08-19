"use client"

import { Form, FormSubmit } from "@/src/shared/components/forms";
import MeetiForm from "./MeetiForm";
import { useSession } from "@/src/lib/auth-client";
import Spinner from "@/src/shared/components/ui/Spinner";

export default function CreateMeeti() {
    const { isPending } = useSession();
    if (isPending) return <Spinner />

    return (
        <>
            <Form>
                <MeetiForm />
                <FormSubmit>Create meeti</FormSubmit>
            </Form>
        </>
    );
}
