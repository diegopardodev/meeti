import { Suspense, use, useEffect, useState } from "react";
import Link from "next/link";
import { BellIcon } from "@heroicons/react/24/outline";
import Pusher from "pusher-js";
import Spinner from "../ui/Spinner";
import { useSession } from "@/src/lib/auth-client";

const notificationsPromise = fetch("/api/user/notifications").then(res => res.json());

function NotificationCount() {
    const { data } = useSession();

    const unreadNotifications: number = use(notificationsPromise);
    const[totalNotifications, setTotalNotifications] = useState(unreadNotifications);

    useEffect(() => {
        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!
        });

        const id = `notifications-channel-${data?.user.id}`;
        const channel = pusher.subscribe(id);
        channel.bind("new-notification", () => {
            setTotalNotifications(prev => prev + 1);
        });

        return () => {
            channel.unbind();
            channel.unsubscribe();
        }
    }, [data]);

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