type BookingResponse = {
  reservationID: number;
  lotID: number;
  lotName: string;
  spaceType: SpaceType;
  vehicleID: number;
  vehicleLicense: string;
  startTime: string;
  endTime: string;
  paymentID: number;
  payment: PaymentDetail;
  reservationStatus: ReservationStatus;
  createdTime: string;
  cancelledTime: string;
};

type PaymentDetail = {
  paymentID: number;
  userId: number;
  amount: number;
  paymentType: string;
  paymentStatus: string;
  paymentMethodType: string;
  paymentIssuedAt: string;
};
