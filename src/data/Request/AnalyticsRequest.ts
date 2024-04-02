import apiClient from "~/data/apiRequest";

export async function getAnalyticsData(): Promise<ApiResponse<AnalyticsResponce> | null> {
  const response = await apiClient.get<AnalyticsResponce>("admin/analytics");
  return response;
}
