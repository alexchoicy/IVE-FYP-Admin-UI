import apiClient from "~/data/apiRequest";

export async function getDashboardData(): Promise<ApiResponse<DashboardResponce> | null> {
  const response = await apiClient.get<DashboardResponce>(
    "admin/dashboard_data",
  );
  // const response = new Promise<ApiResponse<DashboardResponce> | null>(
  //   (resolve, reject) => {
  //     resolve({
  //       success: true,
  //       data: {
  //         currentParking: 10,
  //         totalSpace: 100,
  //         todayParking: 20,
  //         Next12HourBookedNumber: {
  //           labels: ["1", "2", "3", "4", "5", "6", "7"],
  //           data: [12, 19, 3, 5, 2, 3, 4],
  //         },
  //       },
  //       statusCode: 200,
  //     });
  //   },
  // );
  return response;
}
