class ParkingLotData {
  lotID: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  totalSpaces: number;
  availableSpaces: number;
  regularSpacePrices: ParkingLotPrice[];
  electricSpacePrices: ParkingLotPrice[];
}

class ParkingLotPrice {
  time: string;
  price: number;
}
