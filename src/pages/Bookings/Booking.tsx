import { IconChevronLeft } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SpaceType } from "~/Enums/Car";
import { ReservationStatus } from "~/Enums/Reservation";
import { BookingModal } from "~/components/Bookings/bookingModal";
import {
  cancelBooking,
  editBooking,
  getBooking,
} from "~/data/Request/BookingRequest";

export function Booking() {
  const { id } = useParams();
  const [booking, setBooking] = useState<BookingResponse>();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [startTime, setStartTime] = useState<string>();
  const [endTime, setEndTime] = useState<string>();
  const [minTime, setMinTime] = useState<string>();
  const [spaceType, setSpaceType] = useState<SpaceType>();
  const [isCanceling, setIsCanceling] = useState(false);

  const history = useNavigate();
  useEffect(() => {
    if (!id || !parseInt(id)) {
      history("/bookings");
      return;
    }
    const fetchBookings = async () => {
      const response = await getBooking(parseInt(id ? id : "0"));
      if (!response) {
        alert("Booking not found");
        history("/bookings");
        return;
      }
      console.log(response);
      setBooking(response.data);
      setIsLoading(false);
      if (
        (response.data?.reservationStatus == ReservationStatus.PENDING ||
          response.data?.reservationStatus == ReservationStatus.PAID) &&
        new Date(response.data?.startTime).getTime() >
          new Date().getTime() - 1000 * 60 * 60 * 1
      ) {
        setIsEditable(true);
      }
      setStartTime(response.data!.startTime);
      setEndTime(response.data!.endTime);
      setSpaceType(response.data!.spaceType);
    };
    fetchBookings();
    const date = new Date();
    const localISO = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
    setMinTime(localISO);
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  function onClickEditButton(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (
      (booking?.reservationStatus == ReservationStatus.PENDING ||
        booking?.reservationStatus == ReservationStatus.PAID) &&
      new Date(booking?.startTime).getTime() >
        new Date().getTime() - 1000 * 60 * 60 * 1
    ) {
      setIsEditing(true);
    } else {
      alert("Booking is not editable");
    }
  }

  function onDateTimeChange(
    e: React.ChangeEvent<HTMLInputElement>,
    refData: React.Dispatch<React.SetStateAction<string | undefined>>,
  ) {
    console.log("From" + e.target.value);
    const date = new Date(e.target.value);
    date.setSeconds(0);
    date.setMilliseconds(0);
    date.setMinutes(0);

    const localISO = new Date(date.getTime() - date.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
    console.log("To" + localISO);
    refData(localISO);
  }

  function onEditSubmit(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const data = {
      startTime: startTime,
      endTime: endTime,
      spaceType: spaceType,
    } as BookingRequest;

    const request = async () => {
      console.log(data);
      const editResponse = await editBooking(booking!.reservationID, data);
      console.log(editResponse);

      if (editResponse?.success) {
        alert("Booking Edited");
      } else {
        alert(editResponse?.errorMessage);
      }
      window.location.reload();
    };

    request();

    // setIsEditing(false);
  }

  function onCancelBooking(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsCanceling(true);
  }

  function onConfirmCancelBooking(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    const request = async () => {
      const cancelResponse = await cancelBooking(booking!.reservationID);
      console.log(cancelResponse);
      if (cancelResponse?.success) {
        alert("Booking Cancelled");
        history("/bookings");
      } else {
        alert(cancelResponse?.errorMessage);
        history("/bookings");
      }
    };
    request();
  }

  return (
    <>
      <BookingModal
        isOpen={isCanceling}
        onClose={() => {
          setIsCanceling(false);
        }}
        onConfirm={onConfirmCancelBooking}
      />
      <div className="mb-4 flex w-full flex-row">
        <Link
          to="/bookings"
          className="ml-2 mt-2 inline-block rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          {<IconChevronLeft />}
        </Link>
        <h1 className="m-2 flex items-center text-2xl font-bold">
          {`Booking ID: ${booking?.reservationID} | Created At ${new Date(
            booking!.createdTime,
          ).toLocaleString("zh-HK", {
            weekday: "long",
            year: "numeric",
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
            hour12: true,
          })}`}
        </h1>
      </div>
      <form>
        <div className="flex flex-col">
          <div className="m-4 flex flex-row justify-between rounded-lg border bg-white p-2">
            <div className="flex w-10/12 flex-col p-2">
              <div className="mt-2 flex">
                <div className="w-1/5">Booking ID :</div>
                <span className="pl-12">{booking?.reservationID}</span>
              </div>
              <div className="mt-2 flex">
                <div className="w-1/5">Car Plate :</div>
                <span className="pl-12">{booking?.vehicleLicense}</span>
              </div>
              <div className="mt-2 flex">
                <div className="w-1/5">Car Lot :</div>
                <span className="pl-12">{`${booking?.lotID}, ${booking?.lotName}`}</span>
              </div>
              <div className="mt-2 flex">
                <div className="w-1/5">Booked Space Type :</div>
                {isEditing ? (
                  <>
                    <select
                      onChange={(e) => {
                        setSpaceType(e.target.value as SpaceType);
                      }}
                      className="pl-12"
                    >
                      <option value={SpaceType.ELECTRIC}>Electric</option>
                      <option value={SpaceType.REGULAR}>Regular</option>
                    </select>
                  </>
                ) : (
                  <>
                    <span className="pl-12">{`${booking?.spaceType}`}</span>
                  </>
                )}
              </div>
              <div className="flex justify-center pt-5">
                Date Time (24H and Rounded to 0 minutes)
              </div>
              <div className="mt-2 flex">
                <div className="w-1/5">Parking Start Time :</div>
                <span className="pl-12">
                  {isEditing ? (
                    <>
                      <div>
                        <input
                          className="pl-2"
                          type="datetime-local"
                          value={startTime}
                          min={minTime}
                          onChange={(e) => onDateTimeChange(e, setStartTime)}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {new Date(booking!.startTime).toLocaleString("en-GB", {
                        weekday: "long",
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                        hour12: true,
                      })}
                    </>
                  )}
                </span>
              </div>
              <div className="mt-2 flex">
                <div className="w-1/5">Parking End Time :</div>
                <span className="pl-12">
                  {isEditing ? (
                    <>
                      <div>
                        <input
                          className="pl-2"
                          type="datetime-local"
                          value={endTime}
                          min={minTime}
                          onChange={(e) => onDateTimeChange(e, setEndTime)}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      {new Date(booking!.endTime).toLocaleString("en-GB", {
                        weekday: "long",
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                        hour12: true,
                      })}
                    </>
                  )}
                </span>
              </div>
            </div>
            {isEditable && (
              <>
                <div className="mr-4">
                  <div>Options</div>
                  <div className="grid grid-cols-2 border p-2">
                    {isEditing ? (
                      <>
                        <button
                          type="submit"
                          onClick={onEditSubmit}
                          className="m-2 rounded-lg bg-green-700 p-4 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 "
                        >
                          Save
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setIsEditing(false);
                          }}
                          className="m-2 rounded-lg bg-red-700 p-4 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 "
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={onClickEditButton}
                          className="m-2 rounded-lg bg-blue-700 p-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 "
                        >
                          Edit
                        </button>

                        {booking?.reservationStatus ==
                          ReservationStatus.PENDING && (
                          <>
                            <button
                              onClick={onCancelBooking}
                              className="m-2 rounded-lg bg-red-700 p-4 text-center text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 "
                            >
                              Cancel Bookings
                            </button>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="m-4 flex flex-col rounded-lg border bg-white p-2">
            <h1 className="bold text-xl">Payment</h1>
            <div className="mt-2 flex flex-col">
              <div className="mt-2 flex">
                <div className="w-1/5">Payment Status :</div>
                <span className="pl-12">{booking?.payment.paymentStatus}</span>
              </div>
              <div className="mt-2 flex">
                <div className="w-1/5">Payment Method :</div>
                <span className="pl-12">
                  {booking?.payment.paymentMethodType}
                </span>
              </div>
              <div className="mt-2 flex">
                <div className="w-1/5">Total Price :</div>
                <span className="pl-12">{booking?.payment.amount}</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
