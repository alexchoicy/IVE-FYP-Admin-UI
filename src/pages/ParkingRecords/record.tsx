import { IconChevronLeft } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RecordHistoryList } from "~/components/ParkingRecord/RecordHistoryList";
import { getParkingRecord } from "~/data/Request/ParkingRecordRequest";

export function Record() {
  const params = useParams();
  const [record, setRecord] = useState<ParkingRecord>();
  console.log(params);

  useEffect(() => {
    const fetchRecord = async () => {
      const response = await getParkingRecord(
        parseInt(params.id ? params.id : "0"),
      );
      console.log(response);
      if (!response) {
        return;
      }
      setRecord(response.data);
    };
    fetchRecord();
  }, [params.id]);

  if (!record) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="mb-4 flex w-full flex-row">
        <Link
          to="/records"
          className="ml-2 mt-2 inline-block rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          {<IconChevronLeft />}
        </Link>
        <h1 className="m-2 flex items-center text-2xl font-bold">
          Record ID : {record?.sessionID}
        </h1>
      </div>

      <div className="m-12 rounded border bg-zinc-50 p-4 shadow">
        <div className="flex">
          <div className="w-1/5">Entry Time :</div>
          <div className="pl-12">
            {new Date(record.entryTime).toLocaleString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              hour12: true,
            })}
          </div>
        </div>
        <div className="flex">
          <div className="w-1/5">Exit Time :</div>
          <div className="pl-12">
            {record.exitTime != null
              ? new Date(record.exitTime).toLocaleString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                  hour12: true,
                })
              : "Not Exit yet"}
          </div>
        </div>
        <div className="flex">
          <div className="w-1/5">Vehicle License :</div>
          <div className="pl-12">{record?.vehicleLicense}</div>
        </div>
        <div className="flex">
          <div className="w-1/5">Total Price :</div>
          <div className="pl-12">
            {record?.totalPrice
              ? record.totalPrice
              : "The total Price is not calculated yet"}
          </div>
        </div>
      </div>
      {record && <RecordHistoryList history={record.records} />}
    </>
  );
}
