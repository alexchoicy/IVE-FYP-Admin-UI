import apiClient from "~/data/apiRequest";

export async function getParkingLots() : Promise<ApiResponse<ParkingLotData[]> | null>{
    const response = await apiClient.get<ParkingLotData[]>('me');
    return response;
}