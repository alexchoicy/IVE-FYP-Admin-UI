class apiClient{
    
    async get<T>(endpoint: string) : Promise<ApiResponse<T> | null>{
        try {
        const respone = await fetch(`/api/${endpoint}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        const responseData : ApiResponse<T> = await respone.json();
        
        return responseData;
        } catch (error) {
            console.log(error)
            return null;
        }
    }
}

export default new apiClient();