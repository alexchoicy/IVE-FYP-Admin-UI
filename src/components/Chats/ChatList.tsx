import React from "react";
import { useNavigate } from "react-router-dom";
import { Chats } from "~/@types/data/Response/ChatResponce";

type ChatListProps = {
  chats: Chats[];
  selectedChat: string;
  setSelectedChat: React.Dispatch<React.SetStateAction<string>>;
  newMessages: { [key: string]: boolean };
  pagedInfo: PagedReponse<Chats[]>;
  showMorePage: () => void;
};

export function ChatList({
  chats,
  selectedChat,
  setSelectedChat,
  newMessages,
  pagedInfo,
  showMorePage,
}: ChatListProps) {
  const navigate = useNavigate();

  function onChatSelect(chatRoomID: string) {
    setSelectedChat(chatRoomID);
    console.log(chatRoomID);
    navigate(`/chats/${chatRoomID}`);
  }

  return (
    <>
      <li>
        {chats.map((chat) => (
          <div
            key={chat.chatRoomID}
            className={
              "flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out " +
              (selectedChat == chat.chatRoomID
                ? "bg-blue-500 text-white"
                : "cursor-pointer border-b border-gray-200 bg-white hover:bg-gray-100")
            }
            onClick={() => onChatSelect(chat.chatRoomID)}
          >
            {chat.customerName}
            {newMessages[chat.chatRoomID] && (
              <span className="ml-2 text-red-500">•</span>
            )}
          </div>
        ))}
      </li>
      {pagedInfo && pagedInfo.hasNext && (
        <>
          <li>
            <button
              onClick={() => showMorePage()}
              className="block w-full bg-blue-500 py-2 text-center text-sm text-white"
            >
              Show More
            </button>
          </li>
        </>
      )}
    </>
  );
}
