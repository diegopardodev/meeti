import { Suspense, use } from "react";
import { useFormContext } from "react-hook-form";
import { FormError, FormLabel, FormSelect } from "@/src/shared/components/forms";
import Spinner from "@/src/shared/components/ui/Spinner";
import { SelectCategory } from "../types";
import { MeetiInput } from "../schemas/meeti";

const categoriesPromise = fetch("/api/categories").then(res => res.json());

function CategoryOptions() {
    const { register, formState: { errors } } = useFormContext<MeetiInput>();
    const categories = use<SelectCategory[]>(categoriesPromise);

    return (
        <>
            <FormLabel>Meeti category</FormLabel>
            <FormSelect
                {...register("categoryId")}
            >
                <option value="">Select a category</option>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </FormSelect>
            { errors.categoryId && <FormError>{errors.categoryId.message}</FormError> }
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
