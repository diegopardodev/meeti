import { INotificationRepository, notificationRepository } from "./NotificacionRepository";

class NotificationService {
    constructor(
        private notificationRepository: INotificationRepository
    ) {}

    async getUnreadCount(userId: string) {
        return await this.notificationRepository.getUnreadCount(userId);
    }

    async getUserNotifications(userId: string) {
        return await this.notificationRepository.findByUser(userId);
    }

    async clearNotifications(userId: string) {
        return await this.notificationRepository.delete(userId);
    }
}

export const notificationService = new NotificationService(notificationRepository);