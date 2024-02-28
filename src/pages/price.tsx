import { IconLoader } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { ButtonType, CustomButton } from "~/components/Buttons";
import { ParkingLotPricesList } from "~/components/ParkingLotPrice/PricesList";
import { useUserInfoContext } from "~/context/UserInfoContext";
import {
  getParkingLot,
  updateParkingLotPrice,
} from "~/data/Request/ParkingLotsRequest";

export function Price() {
  const { userInfo } = useUserInfoContext();
  const [amprices, setamPrices] = useState<ParkingLotPrice[]>([]);
  const [pmprices, setpmPrices] = useState<ParkingLotPrice[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const pricesData = async () => {
      const response = await getParkingLot(userInfo!.carParkID);
      if (response!.data) {
        loadPrices(response!.data.prices);
      } else {
        console.log("error");
        alert("Error");
      }
    };
    pricesData();
  }, []);

  const loadPrices = (prices: ParkingLotPrice[]) => {
    const amPrices = prices.filter((price) => parseInt(price.time) < 12);
    const pmPrices = prices.filter((price) => parseInt(price.time) >= 12);
    setamPrices(amPrices);
    setpmPrices(pmPrices);
  };

  const handlePriceChange = (time: string, newPrice: string) => {
    if (parseInt(time) < 12) {
      setamPrices((prevPrices) =>
        prevPrices.map((price) =>
          price.time === time ? { ...price, price: Number(newPrice) } : price,
        ),
      );
    } else {
      setpmPrices((prevPrices) =>
        prevPrices.map((price) =>
          price.time === time ? { ...price, price: Number(newPrice) } : price,
        ),
      );
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const prices = [...amprices, ...pmprices];
    const response = await updateParkingLotPrice(userInfo!.carParkID, prices);
    if (response) {
      alert("Prices updated");
    } else {
      alert("Error");
    }
    setLoading(false);
  };

  return (
    <>
      <div className="flex h-screen flex-col items-center pt-5">
        <form onSubmit={handleSubmit}>
          <div className="font-bold">Each Price in 24 hours</div>
          <div className="flex flex-row justify-around space-x-4">
            <div className="rounded-lg bg-blue-100 p-5">
              <ParkingLotPricesList
                title={"AM"}
                prices={amprices}
                onChange={handlePriceChange}
              />
            </div>
            <div className="rounded-lg bg-blue-100 p-5">
              <ParkingLotPricesList
                title={"PM"}
                prices={pmprices}
                onChange={handlePriceChange}
              />
            </div>
          </div>
          <div className="p-10">
            <CustomButton
              buttonType={ButtonType.SUBMIT}
              type="submit"
              options={{ disabled: loading }}
            >
              {loading ? (
                <>
                  <IconLoader className="mr-2 h-5 w-5 animate-spin" />
                </>
              ) : (
                "Submit"
              )}
            </CustomButton>
          </div>
        </form>
      </div>
    </>
  );
}
