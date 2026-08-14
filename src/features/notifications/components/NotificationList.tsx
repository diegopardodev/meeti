import { formatCreatedDate } from "@/src/shared/utils/date";
import { SelectNotification } from "../types"
import EmptyState from "./EmptyState";

type Props = {
    notifications: SelectNotification[];
}

export default function NotificationList({ notifications }: Props) {
    return (
        <div className="mt-10 space-y-4">
            { notifications.length ? (
                notifications.map(notification => (
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
