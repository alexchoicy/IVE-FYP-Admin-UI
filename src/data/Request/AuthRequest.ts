export async function LoginRequest(data : LoginRequest) : Promise<ApiResponse<UserInfo>>{
    const respone = await fetch('/api/v1/auth/admin/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const responseData : ApiResponse<UserInfo> = await respone.json();
    
    return responseData;
}

export async function LogoutRequest() : Promise<boolean>{
    const respone = await fetch('/api/v1/auth/admin/logout', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include',
    });
    return respone.ok;
}