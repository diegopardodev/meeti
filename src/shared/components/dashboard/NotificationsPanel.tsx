import { Suspense, use } from "react";
import Link from "next/link";
import { BellIcon } from "@heroicons/react/24/outline";
import Spinner from "../ui/Spinner";

const notificationsPromise = fetch("/api/user/notifications").then(res => res.json());

function NotificationCount() {
    const totalNotifications = use(notificationsPromise);

    return (
        <Link
            href="/dashboard/notifications"
            className="relative rounded-full p-1 text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-orange-500"
        >
            <span className="sr-only">View notifications</span>
            <BellIcon aria-hidden="true" className="size-6" />
            {totalNotifications > 0 && (
                <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white p-2">
                    {totalNotifications}
                </span>
            )}
        </Link>
    )
}

export default function NotificationsPanel() {
    return (
        <Suspense fallback={<Spinner />}>
            <NotificationCount />
        </Suspense>
    )
}