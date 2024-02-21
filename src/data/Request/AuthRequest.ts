import { apiRequest } from "../apiRequest";


export async function LoginRequest(data : LoginRequest) : Promise<ApiResponse<UserInfo>>{
    const respones : ApiResponse<UserInfo> = await apiRequest<UserInfo>(data, "POST", "auth/admin/login");
    return respones;
}