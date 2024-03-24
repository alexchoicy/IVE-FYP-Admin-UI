type ParkingRecord = {
    sessionID : number;
    lotID: number;
    lotName: string;
    entryTime: Date;
    exitTime: Date | null;
    vehicleLicense: string;
    totalPrice: number | null;
    records : ParkingRecordDetail[]
}

type ParkingRecordDetail = {
    parkingRecordID: number;
    period: number;
    entryTime: Date;
    exitTime: Date | null;
    reservation: any;
    price: number;
    spaceType: string;
    paymentStatus: string;
}