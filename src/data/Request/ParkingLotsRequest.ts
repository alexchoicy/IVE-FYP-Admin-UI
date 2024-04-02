import { SpaceType } from "~/Enums/Car";
import apiClient from "~/data/apiRequest";

export async function getParkingLots(): Promise<ApiResponse<
  ParkingLotData[]
> | null> {
  const response = await apiClient.get<ParkingLotData[]>("parkinglots");
  return response;
}

export async function getParkingLot(
  id: number,
): Promise<ApiResponse<ParkingLotData> | null> {
  const response = await apiClient.get<ParkingLotData>(`parkinglots/${id}`);
  return response;
}

export async function updateParkingLotPrice(
  id: number,
  spaceType: SpaceType,
  prices: ParkingLotPrice[],
) {
  const response = await apiClient.put<ParkingLotData>(
    `parkinglots/${id}/prices/${spaceType == SpaceType.REGULAR ? "regular" : "electric"}`,
    prices,
  );
  return response;
}
