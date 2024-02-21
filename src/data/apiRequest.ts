const apiDomain = import.meta.env.VITE_API_DOMAIN as string;
const apiVersion = import.meta.env.VITE_API_VERSION as string;
export async function apiRequest<T>(data : unknown, method : string, endpoint : string) : Promise<ApiResponse<T>> {
    console.log(apiDomain, apiVersion, endpoint, method, data)
    const response = await fetch(`${apiDomain}/${apiVersion}/${endpoint}`, {
        method: method,
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const responseData : ApiResponse<T> = await response.json();
    return responseData;
}