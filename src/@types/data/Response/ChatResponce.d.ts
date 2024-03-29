import { ChatRoomStatus, SenderType } from "~/Enums/Chats";

type Chats = {
    chatRoomID: string;
    customerID: string;
    customerName: string;
    chatRoomStatus: ChatRoomStatus;
    createdAt: string;
    updatedAt: string;
    endedAt: string | null;
    history: WebSocketChatModel[] | null;
}
