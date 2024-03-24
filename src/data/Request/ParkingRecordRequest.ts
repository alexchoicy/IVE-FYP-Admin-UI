import apiClient from "~/data/apiRequest";


export async function getParkingRecords(id : number, page : number, recordsPerPage: number) : Promise<ApiResponse<PagedReponse<ParkingRecord[]>> | null> {
    const response = await apiClient.get<PagedReponse<ParkingRecord[]>>(`parkinglots/${id}/parkingrecords?page=${page}&recordsPerPage=${recordsPerPage}`)
    return response;
}

export async function getParkingRecord(sessionID : number) : Promise<ApiResponse<ParkingRecord> | null>{
    const response = await apiClient.get<ParkingRecord>(`admin/parkingrecords/${sessionID}`);
    return response;
}