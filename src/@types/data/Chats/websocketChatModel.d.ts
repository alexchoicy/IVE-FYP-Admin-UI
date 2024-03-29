type WebSocketChatModel = {
    message : string;
    senderID : number;
    chatSender : SenderType;
    createdAt : string;
};

type WebSocketErrorModel = {
    message : string;
    error : WebSocketErrorType;
    createdAt : string;
}