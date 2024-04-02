class apiClient {
  async get<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T> | null> {
    try {
      const respone = await fetch(`/api/v1/${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        ...options,
      });
      const responseData: ApiResponse<T> = await respone.json();

      return responseData;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async put<T>(endpoint: string, data: any): Promise<ApiResponse<T> | null> {
    try {
      const respone = await fetch(`/api/v1/${endpoint}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const responseData: ApiResponse<T> = await respone.json();

      return responseData;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T> | null> {
    try {
      const respone = await fetch(`/api/v1/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      const responseData: ApiResponse<T> = await respone.json();

      return responseData;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T> | null> {
    try {
      const respone = await fetch(`/api/v1/${endpoint}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const responseData: ApiResponse<T> = await respone.json();

      return responseData;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

export default new apiClient();
