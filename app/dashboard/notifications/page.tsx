import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "@/src/lib/auth-server";
import Heading from "@/src/shared/components/typography/Heading";
import { generatePageTitle } from "@/src/shared/utils/metadata";
import { notificationService } from "@/src/features/notifications/services/NotificationService";
import NotificationList from "@/src/features/notifications/components/NotificationList";

export const metadata: Metadata = {
    title: generatePageTitle("Notifications")
}

export default async function NotificationsPage() {
    const session = await getServerSession();
    if (!session) redirect("/auth/sign-in");

    const notifications = await notificationService.getUserNotifications(session.user.id);
    await notificationService.clearNotifications(session.user.id);

    return (
        <>
            <Heading>Your notifications</Heading>
            <NotificationList notifications={notifications} />
        </>
    )
}
