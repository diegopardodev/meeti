"use client";

import Pusher from "pusher-js";
import { formatCreatedDate } from "@/src/shared/utils/date";
import { SelectNotification } from "../types"
import EmptyState from "./EmptyState";
import { useEffect, useState } from "react";
import { useSession } from "@/src/lib/auth-client";

type Props = {
    notifications: SelectNotification[];
}

export default function NotificationList({ notifications }: Props) {
    const { data } = useSession();
    const[unreadNotifications, setUnreadNotifications] = useState(notifications);

    useEffect(() => {
        const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
            cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!
        });

        const id = `notifications-channel-${data?.user.id}`;
        const channel = pusher.subscribe(id);
        channel.bind("new-notification", (notification: SelectNotification) => {
            setUnreadNotifications((prev) => [notification, ...prev])
        });

        return () => {
            channel.unsubscribe();
            channel.unbind();
        }
    }, [data]);

    return (
        <div className="mt-10 space-y-4">
            { unreadNotifications.length ? (
                unreadNotifications.map(notification => (
                    <div key={notification.id} className="p-4 rounded-lg shadow-xs shadow-gray-300">
                        <p>
                            {notification.actorName} - {notification.message} {""}
                            <span className="font-bold">{notification.target}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                            {formatCreatedDate(notification.createdAt) + " ago"}
                        </p>
                    </div>
                ))
            ): <EmptyState />  }
        </div>
    )
}
