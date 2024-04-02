import apiClient from "~/data/apiRequest";

export async function getBookings(
  lotID: number,
): Promise<ApiResponse<BookingResponse[]> | null> {
  const responce = await apiClient.get<BookingResponse[]>(
    `reservations?parkingLotId=${lotID}`,
  );

  return responce;
}

export async function getBooking(
  id: number,
): Promise<ApiResponse<BookingResponse> | null> {
  const responce = await apiClient.get<BookingResponse>(`reservations/${id}`);
  return responce;
}

export async function cancelBooking(
  id: number,
): Promise<ApiResponse<boolean> | null> {
  const responce = await apiClient.put<boolean>(
    `reservations/${id}/cancel`,
    null,
  );
  return responce;
}

export async function editBooking(
  id: number,
  request: BookingRequest,
): Promise<ApiResponse<boolean> | null> {
  const responce = await apiClient.put<boolean>(
    `reservations/${id}/edit`,
    request,
  );
  return responce;
}
