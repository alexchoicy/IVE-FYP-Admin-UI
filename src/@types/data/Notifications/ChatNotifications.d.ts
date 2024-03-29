import { ChatNotificationsType } from "~/Enums/Notifications";

type ChatNotifications = {
    type: ChatNotificationsType;
    roomID: string;
}