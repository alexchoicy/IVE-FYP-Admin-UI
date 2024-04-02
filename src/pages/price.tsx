import { IconLoader } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { SpaceType } from "~/Enums/Car";
import { ButtonType, CustomButton } from "~/components/Buttons";
import { ParkingLotPricesList } from "~/components/ParkingLotPrice/PricesList";
import { useUserInfoContext } from "~/context/UserInfoContext";
import {
  getParkingLot,
  updateParkingLotPrice,
} from "~/data/Request/ParkingLotsRequest";

export function Price() {
  const { userInfo } = useUserInfoContext();
  const [currentPageType, setCurrentPageType] = useState<SpaceType>(
    SpaceType.REGULAR,
  );
  const [amprices, setamPrices] = useState<ParkingLotPrice[]>([]);
  const [pmprices, setpmPrices] = useState<ParkingLotPrice[]>([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ParkingLotData>();

  useEffect(() => {
    const pricesData = async () => {
      const response = await getParkingLot(userInfo!.carParkID);
      if (response!.data) {
        setData(response!.data);
        loadPrices(response!.data, currentPageType);
      } else {
        console.log("error");
        alert("Error");
      }
    };
    pricesData();
  }, []);

  useEffect(() => {
    if (data) {
      loadPrices(data, currentPageType);
    }
  }, [currentPageType]);

  const loadPrices = (data: ParkingLotData, type: SpaceType) => {
    const prices =
      type === SpaceType.REGULAR
        ? data.regularSpacePrices
        : (data.electricSpacePrices as ParkingLotPrice[]);
    console.log(prices);
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
    const response = await updateParkingLotPrice(
      userInfo!.carParkID,
      currentPageType,
      prices,
    );
    if (response) {
      alert("Prices updated");
    } else {
      alert("Error");
    }
    setLoading(false);
    window.location.reload();
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="flex h-screen flex-col items-center pt-5">
        <div className="m-5 flex flex-row">
          <div className="inline-flex items-center">
            <label className="mr-2">Regular</label>
            <div className="relative inline-block h-4 w-8 cursor-pointer rounded-full">
              <input
                id="switch"
                type="checkbox"
                onChange={() => {
                  setCurrentPageType(
                    currentPageType === SpaceType.REGULAR
                      ? SpaceType.ELECTRIC
                      : SpaceType.REGULAR,
                  );
                }}
                className="bg-blue-gray-100 peer absolute h-4 w-8 cursor-pointer appearance-none rounded-full transition-colors duration-300 checked:bg-gray-900 peer-checked:border-gray-900 peer-checked:before:bg-gray-900"
              />
              <label
                htmlFor="switch"
                className="before:content[''] border-blue-gray-100 before:bg-blue-gray-500 absolute -left-1 top-2/4 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border bg-white shadow-md transition-all duration-300 before:absolute before:left-2/4 before:top-2/4 before:block before:h-10 before:w-10 before:-translate-x-2/4 before:-translate-y-2/4 before:rounded-full before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-gray-900 peer-checked:before:bg-gray-900"
              >
                <div
                  className="left-2/4 top-2/4 inline-block -translate-x-2/4 -translate-y-2/4 rounded-full p-5"
                  data-ripple-dark="true"
                ></div>
              </label>
            </div>
            <label className="ml-2">Electric</label>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="font-bold">
            Each Price in 24 hours In {currentPageType}
          </div>
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
          <div className="flex items-center justify-center p-10">
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
