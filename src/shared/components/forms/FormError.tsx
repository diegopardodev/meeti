import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

export function FormError({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center gap-2">
            <ExclamationCircleIcon className="size-5 text-red-500" />
            <p className="text-red-500">{children}</p>
        </div>
    )
}
