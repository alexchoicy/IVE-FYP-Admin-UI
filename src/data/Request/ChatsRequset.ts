import { Chats } from "~/@types/data/Response/ChatResponce";
import apiClient from "~/data/apiRequest";

export async function getChats(page : number) : Promise<ApiResponse<PagedReponse<Chats[]>> | null>{
    const response = await apiClient.get<PagedReponse<Chats[]>>(`chats?page=${page}`);
    return response;
}

export async function getChatHistory(id: string,) : Promise<ApiResponse<Chats> | null> {
    const response = await apiClient.get<Chats>(`chats/${id}/history`);
    return response;
}