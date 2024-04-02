import { AnalyticsLayout } from "~/components/Analytics/AnalyticsLayout";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { getAnalyticsData } from "~/data/Request/AnalyticsRequest";
import { AnalyticsBox } from "~/components/Analytics/AnalyticsBox";
export function Analytics() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  );
  const [data, setData] = useState<AnalyticsResponce>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAnalyticsData();
      if (response) {
        setData(response.data);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="items-centerr mx-auto flex h-full w-full flex-col p-4">
        <AnalyticsLayout title="Parking">
          <div className="rounded-sm border bg-gray-100 px-7 py-6 shadow">
            <Bar
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Parking Record",
                  },
                },
              }}
              data={{
                labels: data?.parkingAnalytics.areaAccessCount.labels,
                datasets: [
                  {
                    label: "Area Access Count",
                    data: data?.parkingAnalytics.areaAccessCount.data,
                    backgroundColor: "rgb(255, 99, 132)",
                  },
                ],
              }}
            />
          </div>

          <div className="rounded-sm border bg-gray-100 px-7 py-6 shadow">
            <AnalyticsBox>
              <div>
                <h4 className=" text-center font-bold text-black">
                  Average Parking Time in Last 7 Days
                </h4>
                <div className="h-full w-full p-2 text-center">
                  {data?.parkingAnalytics.parkingTimeInLast7days.averageParkingTime.toFixed(
                    2,
                  )}{" "}
                  Minutes
                </div>
              </div>
            </AnalyticsBox>
            <AnalyticsBox>
              <div>
                <h4 className="text-center font-bold text-black">
                  Highest Parking Time in Last 7 Days
                </h4>
                <div className="h-full w-full p-2 text-center">
                  {data?.parkingAnalytics.parkingTimeInLast7days.maxParkingTime.toFixed(
                    2,
                  )}{" "}
                  Minutes
                </div>
              </div>
            </AnalyticsBox>
            <AnalyticsBox>
              <div>
                <h4 className="text-center font-bold text-black">
                  Lowest Parking Time in Last 7 Days
                </h4>
                <div className="h-full w-full p-2 text-center">
                  {data?.parkingAnalytics.parkingTimeInLast7days.minParkingTime.toFixed(
                    2,
                  )}{" "}
                  Minutes
                </div>
              </div>
            </AnalyticsBox>
          </div>
          <div className="col-span-2 rounded-sm border bg-gray-100 px-7 py-6 shadow">
            <Bar
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1,
                    },
                  },
                },
                plugins: {
                  title: {
                    display: true,
                    text: "Number of Car getted in Last 24 Hours",
                  },
                },
              }}
              data={{
                labels: data?.parkingAnalytics.numberOfCarInLast24Hour.labels,
                datasets: [
                  {
                    label: "Car Getted in Last 24 Hours",
                    data: data?.parkingAnalytics.numberOfCarInLast24Hour.data,
                    backgroundColor: "rgb(255, 99, 132)",
                  },
                ],
              }}
            />
          </div>
        </AnalyticsLayout>

        <AnalyticsLayout title="Reservation">
          <div className="rounded-sm border bg-gray-100 px-7 py-6 shadow">
            <Bar
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Reservation Type",
                  },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1,
                    },
                  },
                },
              }}
              data={{
                labels:
                  data?.parkingAnalytics.reservationInLast7days.reservationType
                    .labels,
                datasets: [
                  {
                    label: "Reservation Type",
                    data: data?.parkingAnalytics.reservationInLast7days
                      .reservationType.data,
                    backgroundColor: "rgb(255, 99, 132)",
                  },
                ],
              }}
            />
          </div>

          <div className="rounded-sm border bg-gray-100 px-7 py-6 shadow">
            <AnalyticsBox>
              <div>
                <h4 className="text-center font-bold text-black">
                  Average Reservation Time in Last 7 Days
                </h4>
                <div className="h-full w-full p-2 text-center">
                  {data?.parkingAnalytics.reservationInLast7days.reservationAboutTime.averageReservationTime.toFixed(
                    2,
                  )}{" "}
                  Minutes
                </div>
              </div>
            </AnalyticsBox>
            <AnalyticsBox>
              <div>
                <h4 className="text-center font-bold text-black">
                  Highest Reservation Time in Last 7 Days
                </h4>
                <div className="h-full w-full p-2 text-center">
                  {data?.parkingAnalytics.reservationInLast7days.reservationAboutTime.maxReservationTime.toFixed(
                    2,
                  )}{" "}
                  Minutes
                </div>
              </div>
            </AnalyticsBox>
            <AnalyticsBox>
              <div>
                <h4 className="text-center font-bold text-black">
                  Lowest Reservation Time in Last 7 Days
                </h4>
                <div className="h-full w-full p-2 text-center">
                  {data?.parkingAnalytics.reservationInLast7days.reservationAboutTime.minReservationTime.toFixed(
                    2,
                  )}{" "}
                  Minutes
                </div>
              </div>
            </AnalyticsBox>
          </div>
          <div className="col-span-2 rounded-sm border bg-gray-100 px-7 py-6 shadow">
            <Bar
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1,
                    },
                  },
                },
                plugins: {
                  title: {
                    display: true,
                    text: "Number of Reservation in Last 7 Days",
                  },
                },
              }}
              data={{
                labels:
                  data?.parkingAnalytics.reservationInLast7days.reservationCount
                    .labels,
                datasets: [
                  {
                    label: "Reservation in Last 24 Hours",
                    data: data?.parkingAnalytics.reservationInLast7days
                      .reservationCount.data,
                    backgroundColor: "rgb(255, 99, 132)",
                  },
                ],
              }}
            />
          </div>
        </AnalyticsLayout>

        <AnalyticsLayout title="Payment">
          <div className="rounded-sm border bg-gray-100 px-7 py-6 shadow">
            <Bar
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Payment Method Used",
                  },
                },
              }}
              data={{
                labels: data?.paymentAnalytics.paymentMethod.labels,
                datasets: [
                  {
                    label: "Payment Method",
                    data: data?.paymentAnalytics.paymentMethod.data,
                    backgroundColor: "rgb(255, 99, 132)",
                  },
                ],
              }}
            />
          </div>
          <div className="rounded-sm border bg-gray-100 px-7 py-6 shadow">
            <Bar
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Payment Gateway Used",
                  },
                },
              }}
              data={{
                labels: data?.paymentAnalytics.paymentMethodType.labels,
                datasets: [
                  {
                    label: "Payment Gateway Used",
                    data: data?.paymentAnalytics.paymentMethodType.data,
                    backgroundColor: "rgb(255, 99, 132)",
                  },
                ],
              }}
            />
          </div>
          <div className="rounded-sm border bg-gray-100 px-7 py-6 shadow">
            <Bar
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Average Parking Price in Last 7 Days",
                  },
                },
              }}
              data={{
                labels:
                  data?.paymentAnalytics.averageParkingPriceInLast7days.labels,
                datasets: [
                  {
                    label: "Average Parking Price",
                    data: data?.paymentAnalytics.averageParkingPriceInLast7days
                      .data,
                    backgroundColor: "rgb(255, 99, 132)",
                  },
                ],
              }}
            />
          </div>
          <div className="rounded-sm border bg-gray-100 px-7 py-6 shadow">
            <Bar
              options={{
                plugins: {
                  title: {
                    display: true,
                    text: "Earned in Last 7 Days",
                  },
                },
              }}
              data={{
                labels: data?.paymentAnalytics.priceRangeInLast7days.labels,
                datasets: [
                  {
                    label: "Price Range",
                    data: data?.paymentAnalytics.priceRangeInLast7days.data,
                    backgroundColor: "rgb(255, 99, 132)",
                  },
                ],
              }}
            />
          </div>
        </AnalyticsLayout>
      </div>
    </>
  );
}
