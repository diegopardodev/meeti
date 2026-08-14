import Link from "next/link";
import { PlusIcon } from "@heroicons/react/20/solid";

type Props = {
    section: "communities" | "joined";
}

export default function EmptyState({ section }: Props) {
    return (
        <div className="flex flex-col items-center mt-20 border rounded-lg border-dashed border-gray-400 p-10">
            <svg
                fill="none"
                stroke="currentColor"
                viewBox="0 0 48 48"
                aria-hidden="true"
                className="mx-auto size-12 text-gray-400"
            >
                <path
                    d="M34 40h10v-4a6 6 0 00-10.712-3.714M34 40H14m20 0v-4a9.971 9.971 0 00-.712-3.714M14 40H4v-4a6 6 0 0110.713-3.714M14 40v-4c0-1.313.253-2.566.713-3.714m0 0A10.003 10.003 0 0124 26c4.21 0 7.813 2.602 9.288 6.286M30 14a6 6 0 11-12 0 6 6 0 0112 0zm12 6a4 4 0 11-8 0 4 4 0 018 0zm-28 0a4 4 0 11-8 0 4 4 0 018 0z"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <h3 className="mt-2 text-sm font-semibold text-gray-900">No communities</h3>
            <p className="mt-1 text-sm text-gray-500">{ section === "communities" ? "Get started by creating a new community." : "Get started by joining a community" }</p>
            <div className="mt-6">
                <Link
                    href={`${section === "communities" ? "/dashboard/communities/create" : "/"}`}
                    className="inline-flex items-center rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-orange-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                >
                    <PlusIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5" />
                    { section === "communities" ? "New Community" : "Join Community" }
                </Link>
            </div>
        </div>
    )
}
