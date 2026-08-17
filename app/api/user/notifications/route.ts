import { notificationService } from "@/src/features/notifications/services/NotificationService";
import { getServerSession } from "@/src/lib/auth-server";

export async function GET() {
    const session = await getServerSession();
    if (!session) return new Response(JSON.stringify([]));

    const notifications = await notificationService.getUnreadCount(session.user.id);
    return new Response(JSON.stringify(notifications), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    });
}