class ParkingLotData {
    lotID: number;
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    totalSpaces: number;
    availableSpaces: number;
    prices: ParkingLotPrice[];

}

class ParkingLotPrice {
    time: string;
    price: number;
}