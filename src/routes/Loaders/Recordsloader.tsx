import { getParkingRecords } from "~/data/Request/ParkingRecordRequest";

export async function Recordsloader() {
  const records = await getParkingRecords(1, 1, 10);
  return { records };
}
