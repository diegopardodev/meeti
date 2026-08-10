"use client";

import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BellIcon, FolderIcon, HomeIcon, UsersIcon } from "@heroicons/react/24/outline";
import { classNames, currentPath } from "@/src/shared/utils/ui";

export const navigation = [
    { name: "Admin Panel", href: "/dashboard", icon: HomeIcon },
    { name: "Communities", href: "/dashboard/communities", icon: UsersIcon },
    { name: "Meetis", href: "/dashboard/meetis", icon: FolderIcon },
    { name: "Notifications", href: "/dashboard/notifications", icon: BellIcon },
];

export default function DashboardNavigation() {
    const pathname = usePathname();

    return (
        <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                            <ul role="list" className="-mx-2 space-y-1">
                                {navigation.map((item) => (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href as Route}
                                            className={classNames(
                                                currentPath(item.href, pathname)
                                                    ? "bg-orange-50 text-orange-600"
                                                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-600",
                                                "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold",
                                            )}
                                        >
                                            <item.icon
                                                aria-hidden="true"
                                                className={classNames(
                                                    currentPath(item.href, pathname)
                                                        ? "text-orange-600"
                                                        : "text-gray-400 group-hover:text-orange-600",
                                                    "size-6 shrink-0",
                                                )}
                                            />
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </li>
                        <li>
                            {/* TODO : Widgets */}
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    )
}