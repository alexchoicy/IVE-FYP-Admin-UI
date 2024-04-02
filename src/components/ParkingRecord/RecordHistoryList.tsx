export function RecordHistoryList({
  history,
}: {
  history: ParkingRecordDetail[];
}) {
  console.log(history);
  return (
    <>
      <div className="m-12 flex flex-col rounded-lg bg-zinc-50 p-4 shadow-lg ">
        <div>History</div>
        <div>
          {history.map((record) => (
            <div
              key={record.parkingRecordID}
              className="m-5 rounded border p-4 shadow"
            >
              <div className="flex">
                <div className="w-1/5">Entry Time :</div>
                <div className="pl-12">
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
                </div>
              </div>
              <div className="flex">
                <div className="w-1/5">Exit Time :</div>
                <div className="pl-12">
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
                </div>
              </div>
              <div className="flex">
                <div className="w-1/5">Price :</div>
                <div className="pl-12">{record.price}</div>
              </div>
              <div className="flex">
                <div className="w-1/5">Space Type :</div>
                <div className=" pl-12">{record.spaceType}</div>
              </div>
              <div className="flex">
                <div className="w-1/5">Payment Status :</div>
                <div className="pl-12">{record.paymentStatus}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
