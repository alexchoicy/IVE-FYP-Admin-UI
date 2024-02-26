export async function LoginRequest(data : LoginRequest) : Promise<ApiResponse<UserInfo>>{
    const respone = await fetch('/api/auth/admin/login', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const responseData : ApiResponse<UserInfo> = await respone.json();
    
    return responseData;
}