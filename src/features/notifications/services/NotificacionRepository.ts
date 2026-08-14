import { and, count, eq } from "drizzle-orm";
import { db } from "@/src/db";
import { InsertNotification, SelectNotification } from "../types";
import { notifications } from "@/src/db/schema";

export interface INotificationRepository {
    create(data: InsertNotification): Promise<SelectNotification>;
    getUnreadCount(userId: string): Promise<number>;
    findByUser(userId: string): Promise<SelectNotification[]>;
    delete(userId: string): Promise<void>;
}

class NotificationRepository implements INotificationRepository {
    async create(data: InsertNotification): Promise<SelectNotification> {
        const [result] = await db.insert(notifications).values(data).returning();
        return result;
    }

    async getUnreadCount(userId: string): Promise<number> {
        const [result] = await db.select({ total: count() }).from(notifications).where(and(eq(notifications.userId, userId), eq(notifications.read, false)));
        return result.total;
    }

    async findByUser(userId: string): Promise<SelectNotification[]> {
        const result = await db.query.notifications.findMany({
            where: {
                AND: [
                    { userId: { eq: userId } },
                    { read: { eq: false } }
                ]
            },
            limit: 10,
            orderBy: { createdAt: "desc" }
        });

        return result;
    }

    async delete(userId: string): Promise<void> {
        await db.update(notifications).set({
            read: true
        }).where(eq(notifications.userId, userId));
    }
}

export const notificationRepository = new NotificationRepository();