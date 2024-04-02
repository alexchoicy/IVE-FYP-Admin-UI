type AnalyticsResponce = {
  paymentAnalytics: PaymentAnalytics;
  parkingAnalytics: ParkingAnalytics;
};

type PaymentAnalytics = {
  paymentMethod: ChartjsData;
  paymentMethodType: ChartjsData;
  priceRangeInLast7days: ChartjsData;
  averageParkingPriceInLast7days: ChartjsData;
};

type ParkingAnalytics = {
  areaAccessCount: ChartjsData;
  numberOfCarInLast24Hour: ChartjsData;
  // numberOfCarInLastWeek: ChartjsData;
  // numberOfCarInLastMonth: ChartjsData;
  parkingTimeInLast7days: ParkingTimeAnalytics;
  // parkingTimeInLastMonth: ParkingTimeAnalytics;
  reservationInLast7days: ReservationAnalytics;
  // reservationInLastMonth: ReservationAnalytics;
};

type ParkingTimeAnalytics = {
  averageParkingTime: number;
  maxParkingTime: number;
  minParkingTime: number;
};

type ReservationAboutTime = {
  averageReservationTime: number;
  maxReservationTime: number;
  minReservationTime: number;
};

type ReservationAnalytics = {
  reservationCount: ChartjsData;
  reservationAboutTime: ReservationAboutTime;
  reservationType: ChartjsData;
};
