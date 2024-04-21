import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useUserInfoContext } from "~/context/UserInfoContext";
import { getParkingRecords } from "~/data/Request/ParkingRecordRequest";

// type RecordsloaderProps = {
//   records: ApiResponse<ParkingRecord[]>;
// };

export function Records() {
  // const { records } = useLoaderData() as RecordsloaderProps;
  const { userInfo } = useUserInfoContext();
  const [serachParms, setSerachParms] = useSearchParams({
    page: "1",
    recordsPerPage: "10",
  });
  const [records, setRecords] = useState<ParkingRecord[]>([]);
  const [pageManage, setPageManage] = useState<PagedReponse<any>>();
  const page = parseInt(serachParms.get("page") || "1");
  const recordsPerPage = parseInt(serachParms.get("recordsPerPage") || "10");

  console.log(userInfo);
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const repsonse = await getParkingRecords(
          userInfo.carParkID,
          page,
          recordsPerPage,
        );
        console.log(repsonse);
        if (!repsonse) {
          return;
        }
        setRecords(repsonse.data?.data || []);
        setPageManage(repsonse.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecords();
  }, [serachParms]);

  return (
    <div className="m-12 flex flex-col rounded-lg bg-zinc-50 px-4 shadow-lg ">
      {/* <h1>Records</h1> */}
      <div className="block w-full overflow-x-auto pt-2">
        <table className="w-full border-collapse items-center text-left ">
          <thead>
            <tr>
              <th className="px-6">Session ID</th>
              <th className="px-6">Car Plate</th>
              <th className="px-6">Entry Time</th>
              <th className="px-6">Exit Time</th>
              <th className="px-6">Price</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.sessionID} className="border-b">
                <td className="px-6 py-6">{record.sessionID}</td>
                <td className="px-6 py-6">{record.vehicleLicense}</td>
                <td className="px-6 py-6">
                  {new Date(record.entryTime).toLocaleString("en-GB", {
                    weekday: "long",
                    year: "numeric",
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    hour12: true,
                  })}
                </td>
                <td className="px-6 py-6">
                  {record.exitTime != null
                    ? new Date(record.exitTime).toLocaleString("en-GB", {
                        weekday: "long",
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                        hour12: true,
                      })
                    : "Not Exit yet"}
                </td>
                <td className="px-6 py-6">
                  {record.totalPrice == null
                    ? "Not Exit yet"
                    : record.totalPrice}
                </td>
                <td className="px-6 py-6">
                  <a
                    href={`/records/${record.sessionID}`}
                    className="cursor-pointer text-blue-600 hover:underline"
                  >
                    Detail
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex w-full flex-row items-end justify-end p-4">
        <ul className="">
          <li
            className={`mr-2 inline-block rounded p-1 ${pageManage?.hasPrevious === false ? "bg-gray-300 text-gray-500" : ""}`}
          >
            <button
              onClick={() => {
                setSerachParms({ page: (page - 1).toString() });
              }}
              disabled={pageManage?.hasPrevious === false}
            >
              Previous
            </button>
          </li>
          <li
            className={`inline-block rounded p-1 ${pageManage?.hasNext === false ? "bg-gray-300 text-gray-500" : ""}`}
          >
            <button
              onClick={() => {
                setSerachParms({ page: (page + 1).toString() });
              }}
              disabled={pageManage?.hasNext === false}
            >
              Next
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
