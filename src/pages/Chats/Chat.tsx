import { useEffect, useRef, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { ChatNotifications } from "~/@types/data/Notifications/ChatNotifications";
import { Chats } from "~/@types/data/Response/ChatResponce";
import { ChatNotificationsType } from "~/Enums/Notifications";
import { ChatList } from "~/components/Chats/ChatList";
import { getChats } from "~/data/Request/ChatsRequset";

export function Chat() {
  const ws = useRef<WebSocket>();
  const [chats, setChats] = useState<Chats[]>([]);
  const [selectedChat, setSelectedChat] = useState("");
  const [newMessages, setNewMessages] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [currentPaged, setCurrentPaged] = useState(1);

  const [pagedInfo, setPagedInfo] = useState({} as PagedReponse<Chats[]>);
  const { id } = useParams();
  const fetchData = async (page: number) => {
    const response = await getChats(page);
    console.log("New chat data:", response);
    if (response!.data) {
      setPagedInfo(response!.data!);
      setChats(response!.data!.data || []);
    } else {
      console.log("error");
    }
  };

  const showMorePage = async () => {
    if (!pagedInfo.hasNext) return;
    const nextPage = currentPaged + 1;
    setCurrentPaged(nextPage);
    const response = await getChats(nextPage);
    if (response!.data) {
      setPagedInfo(response!.data!);
      setChats((prev) => [...prev, ...(response!.data!.data || [])]);
    } else {
      console.log("error");
    }
  };

  useEffect(() => {
    const url = `${import.meta.env.VITE_WEBSOCKET_DOMAIN}/${import.meta.env.VITE_API_VERSION}/notifications/chat`;
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data) as ChatNotifications;
      console.log(data);
      if (data.type == ChatNotificationsType.NEW_ROOM) {
        fetchData(1);
      } else if (data.type == ChatNotificationsType.NEW_MESSAGE) {
        setNewMessages((prev) => ({
          ...prev,
          [data.roomID]: true,
        }));
      }
    };

    ws.current.onclose = (event) => {
      console.log("WebSocket connection closed");
      console.log(event);
    };

    ws.current.onerror = (event) => {
      console.log("WebSocket connection error");
      console.log(event);
    };

    return () => {
      if (!ws.current) return;
      ws.current?.close();
    };
  }, []);

  useEffect(() => {
    fetchData(currentPaged);
  }, []);

  useEffect(() => {
    if (!id) return;
    setSelectedChat(id);
    setNewMessages((prev) => ({
      ...prev,
      [id]: false,
    }));
  }, [id]);

  return (
    <>
      <div className="h-screen p-5">
        <div className="flex h-full flex-row rounded border-x border-b border-gray-200 bg-white">
          <ul className="w-1/6 border-r">
            <ChatList
              chats={chats}
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
              newMessages={newMessages}
              pagedInfo={pagedInfo}
              showMorePage={showMorePage}
            />
          </ul>
          <Outlet />
        </div>
      </div>
    </>
  );
}
