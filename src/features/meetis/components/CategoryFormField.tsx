import { Suspense, use } from "react";
import { FormLabel, FormSelect } from "@/src/shared/components/forms";
import Spinner from "@/src/shared/components/ui/Spinner";
import { SelectCategory } from "../types";

const categoriesPromise = fetch("/api/categories").then(res => res.json());

function CategoryOptions() {
    const categories = use<SelectCategory[]>(categoriesPromise);

    return (
        <>
            <FormLabel>Meeti category</FormLabel>
            <FormSelect>
                <option value="">Select a category</option>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </FormSelect>
        </>
    )
}

export default function CategoryFormField() {
    return (
        <Suspense fallback={<Spinner />}>
            <CategoryOptions />
        </Suspense>
    );
}
