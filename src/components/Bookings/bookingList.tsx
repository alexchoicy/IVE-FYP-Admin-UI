import { IconChargingPile, IconGasStation } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { SpaceType } from "~/Enums/Car";
import { ReservationStatus } from "~/Enums/Reservation";

type bookingListProps = {
  bookings: BookingResponse[];
  children?: never;
};

type ReservationProp = {
  [key in ReservationStatus]: { color: string };
};

export function BookingList({ bookings }: bookingListProps) {
  const history = useNavigate();

  const ReservationStatusProperties: ReservationProp = {
    [ReservationStatus.PENDING]: { color: "bg-orange-500" },
    [ReservationStatus.PAID]: { color: "bg-green-500" },
    [ReservationStatus.ACTIVE]: { color: "bg-blue-500" },
    [ReservationStatus.COMPLETED]: { color: "bg-purple-500" },
    [ReservationStatus.CANCELLED]: { color: "bg-red-500" },
  };

  const handleClick = (id: string) => {
    console.log("Button clicked:", id);
    history(`/bookings/${id}`);
  };

  return (
    <>
      {bookings.map((booking) => (
        <tr
          key={booking.reservationID}
          className={`border p-2 text-center ${ReservationStatusProperties[booking.reservationStatus as ReservationStatus].color}`}
        >
          <td className="p-4">{booking.reservationID}</td>
          <td className="">
            {new Date(booking.createdTime).toLocaleDateString("en-GB", {
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
          <td>
            {new Date(booking.startTime).toLocaleDateString("en-GB", {
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
          <td>
            {new Date(booking.endTime).toLocaleDateString("en-GB", {
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
          <td>
            <div className="flex h-full items-center justify-center">
              {booking.spaceType == SpaceType.ELECTRIC ? (
                <IconChargingPile />
              ) : (
                <IconGasStation />
              )}
            </div>
          </td>
          <td>{booking.vehicleLicense}</td>
          <td
            className="rounded bg-blue-500 p-2 font-bold hover:cursor-pointer hover:bg-blue-700"
            id={booking.reservationID.toString()}
            onClick={(e) => handleClick(e.currentTarget.id)}
          >
            Detail
          </td>
        </tr>
      ))}
    </>
  );
}
