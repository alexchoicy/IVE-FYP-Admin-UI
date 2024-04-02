import { useEffect, useState } from "react";
import { BookingList } from "~/components/Bookings/bookingList";
import { useUserInfoContext } from "~/context/UserInfoContext";
import { getBookings } from "~/data/Request/BookingRequest";

export function Bookings() {
  const { userInfo } = useUserInfoContext();
  const [bookings, setBookings] = useState<BookingResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchBookings = async () => {
      const response = await getBookings(userInfo.carParkID);
      if (!response) {
        return;
      }
      console.log(response);
      setBookings(response.data || []);
      setIsLoading(false);
    };
    fetchBookings();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="mx-12 mt-4 flex flex-row rounded-lg bg-zinc-50 p-4 shadow">
        <div className="mb-1 mr-2 flex items-center">
          <div className="mr-2 h-4 w-4 bg-orange-500"></div>
          <div>Pending</div>
        </div>
        <div className="mb-1 mr-2 flex items-center">
          <div className="mr-2 h-4 w-4 bg-green-500"></div>
          <div>Paid</div>
        </div>
        <div className="mb-1 mr-2 flex items-center">
          <div className="mr-2 h-4 w-4 bg-blue-500"></div>
          <div>Active</div>
        </div>
        <div className="mb-1 mr-2 flex items-center">
          <div className="mr-2 h-4 w-4 bg-purple-500"></div>
          <div>Completed</div>
        </div>
        <div className="mb-1 mr-2 flex items-center">
          <div className="mr-2 h-4 w-4 bg-red-500"></div>
          <div>Cancelled</div>
        </div>
      </div>
      <div className="m-12 flex flex-col rounded-lg bg-zinc-50 p-4 shadow-lg">
        <div className="block w-full overflow-x-auto p-2">
          <table className="w-full border-collapse items-center text-left">
            <thead>
              <tr className="text-center">
                <th>Reservation ID</th>
                <th>CreatedAt</th>
                <th>Parking Start Time</th>
                <th>Parking End Time</th>
                <th>Parking Type</th>
                <th>Car Plate</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <BookingList bookings={bookings} />
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
