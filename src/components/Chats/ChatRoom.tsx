import { IconSend } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Chats } from "~/@types/data/Response/ChatResponce";
import { ChatRoomStatus, SenderType } from "~/Enums/Chats";
import { WebSocketErrorType } from "~/Enums/Websocket";
import { getChatHistory } from "~/data/Request/ChatsRequset";

export function ChatRoom() {
  // const socket = useRef<WebSocket>();
  const [sumbitMessage, setSumbitMessage] = useState<string>("");
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const { id } = useParams();
  const [messages, setMessages] = useState<WebSocketChatModel[]>([]);
  const [chatRecord, setChatRecord] = useState<Chats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const messageHandler = (event: MessageEvent) => {
    let data: WebSocketChatModel;
    try {
      data = JSON.parse(event.data);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return;
    }
    setMessages((prev) => [...prev, data]);
  };

  useEffect(() => {
    setIsLoading(true);
    setIsDisabled(false);
    console.log(
      "ChatRoom ID:",
      id + " is loading" + isLoading + " isDisabled" + isDisabled,
    );
    if (!id) return;
    const getHistory = async () => {
      console.log("fetching history");
      const response = (await getChatHistory(id)) as ApiResponse<Chats> | null;
      console.log(response);
      if (!response) {
        console.error("Error fetching chat history");
        return;
      }
      setChatRecord(response.data! || []);
      setMessages(response.data?.history || []);
      setIsLoading(false);
      if (response.data?.chatRoomStatus == ChatRoomStatus.ENDED) {
        console.log("Chat has ended");
        setIsDisabled(true);
        return;
      }
    };
    getHistory();

    const url = `${import.meta.env.VITE_WEBSOCKET_DOMAIN}/${import.meta.env.VITE_API_VERSION}/chats/${id}`;
    const ws = new WebSocket(url);
    setSocket(ws);

    return () => {
      ws.close();
      console.log("WebSocket connection closed");
    };
  }, [id]);

  useEffect(() => {
    if (!socket) {
      return;
    }
    socket.onmessage = messageHandler;
    socket.onopen = () => {
      console.log("Connected");
    };
    socket.onclose = (event) => {
      console.log(
        `${id}[close] Connection closed, code=${event.code} reason=${event.reason}`,
      );

      if (event.reason) {
        const data = JSON.parse(event.reason) as WebSocketErrorModel;
        if (data.error == WebSocketErrorType.DUPLICATED_CONNECTION) {
          alert("You are already connected in another tab");
          setIsDisabled(true);
        } else if (data.error == WebSocketErrorType.CHATROOM_ENDED) {
          setIsDisabled(true);
        }
      }
    };
    socket.onerror = (event) => {
      console.error("Error:", event);
    };
  }, [socket]);

  function getDistanceToNow(data: string): string {
    const cureentTime = new Date();
    const date = new Date(data);
    const diff = cureentTime.getTime() - date.getTime();
    const diffInMinutes = diff / (1000 * 60);
    return diffInMinutes.toFixed(0);
  }
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!sumbitMessage || sumbitMessage == "") return;
    socket?.send(sumbitMessage);
    setMessages((prev) => [
      ...prev,
      {
        message: sumbitMessage,
        chatSender: SenderType.STAFF,
        createdAt: new Date().toISOString(),
        senderID: 0,
      },
    ]);
    setSumbitMessage("");
  };

  const onTextBoxchange = (message: string) => {
    setSumbitMessage(message);
  };

  return (
    <>
      <div className="m-2 flex w-full flex-col">
        {isLoading ? (
          <>
            <div>Loading...</div>
          </>
        ) : (
          <>
            <h1 className="border-b p-2">
              Chat Room {id} - {chatRecord!.customerName} -{" "}
              {chatRecord!.chatRoomStatus}
            </h1>
            <ul className="flex h-full w-full flex-col-reverse overflow-auto rounded">
              {[...messages].reverse().map((message, index) => (
                <li
                  key={index}
                  className={`flex ${
                    message.chatSender === SenderType.CUSTOMER
                      ? "justify-end"
                      : message.chatSender === SenderType.STAFF
                        ? "justify-start"
                        : "justify-center"
                  }`}
                >
                  <div>
                    <div className="m-2 rounded border p-2">
                      {message.message}
                    </div>
                    <div>{getDistanceToNow(message.createdAt)} minutes ago</div>
                  </div>
                </li>
              ))}
            </ul>
            {isDisabled ? (
              <></>
            ) : (
              <>
                <form onSubmit={handleFormSubmit} className="mt-5 w-full">
                  <div className="flex h-full flex-row">
                    <input
                      type="text"
                      placeholder="Write a message"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 py-2 pl-4 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500"
                      name="message"
                      required
                      value={sumbitMessage}
                      onChange={(e) => onTextBoxchange(e.target.value)}
                    />
                    <button type="submit">
                      <IconSend
                        className="h-6 w-20 text-blue-600 dark:text-blue-500"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </form>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}
