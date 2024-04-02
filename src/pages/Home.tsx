import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { getDashboardData } from "~/data/Request/DashBoardRequest";

export function Home() {
  const [dashboardData, setDashboardData] = useState<DashboardResponce | null>(
    null,
  );
  const [maxBookedNumber, setMaxBookedNumber] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  ChartJS.register(
    ArcElement,
    CategoryScale,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    Legend,
  );

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDashboardData();
      console.log(data);
      if (!data) return;
      setDashboardData(data.data!);
      setIsLoading(false);
      setMaxBookedNumber(Math.max(...data.data!.next12HourBookedNumber.data));
      console.log(maxBookedNumber);
    };
    fetchData();
  }, []);

  if (isLoading) {
    console.log(isLoading);
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto p-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-sm border bg-white px-7 py-6 shadow">
          <h4 className="text-2xl font-bold text-black">
            Next 12 Hour Booked Number
          </h4>
          <div className="h-full w-full">
            <Line
              data={{
                labels: dashboardData?.next12HourBookedNumber.labels,
                datasets: [
                  {
                    label: "Next 12 Hour Booked Number",
                    data: dashboardData?.next12HourBookedNumber.data,
                    fill: false,
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgba(255, 99, 132, 0.2)",
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1,
                    },
                    max: maxBookedNumber + 2,
                  },
                },
              }}
            />
          </div>
        </div>
        <div className=" rounded-sm border bg-white px-7 py-7 shadow">
          <h4 className="text-2xl font-bold text-black">
            Today Parking {dashboardData?.todayParkingInTotal}
          </h4>
          <div className="h-full w-full">
            <Line
              data={{
                labels: dashboardData?.todayParking.labels,
                datasets: [
                  {
                    label: "Today Parking",
                    data: dashboardData?.todayParking.data,
                    fill: false,
                    backgroundColor: "rgb(255, 99, 132)",
                    borderColor: "rgba(255, 99, 132, 0.2)",
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="rounded-sm border bg-white px-7 py-6 shadow">
          <h4 className="text-2xl font-bold text-black">
            Current Parking In Regular
          </h4>
          <div className="h-full w-full">
            <Doughnut
              data={{
                labels: ["Current Parking", "Empty Space"],
                datasets: [
                  {
                    label: "Current Parking",
                    data: [
                      dashboardData?.currentParkingInRegular,
                      dashboardData!.totalSpaceInRegular -
                        dashboardData!.currentParkingInRegular,
                    ],
                    backgroundColor: ["#FF6384", "#36A2EB"],
                    hoverBackgroundColor: ["#FF6384", "#36A2EB"],
                  },
                ],
              }}
              options={{
                aspectRatio: 2.5,
              }}
            />
          </div>
        </div>
        <div className="rounded-sm border bg-white px-7 py-6 shadow">
          <h4 className="text-2xl font-bold text-black">
            Current Parking In Electric
          </h4>
          <div className="h-full w-full">
            <Doughnut
              data={{
                labels: ["Current Parking", "Empty Space"],
                datasets: [
                  {
                    label: "Current Parking",
                    data: [
                      dashboardData?.currentParkingInElectric,
                      dashboardData!.totalSpaceInElectric -
                        dashboardData!.currentParkingInElectric,
                    ],
                    backgroundColor: ["#FF6384", "#36A2EB"],
                    hoverBackgroundColor: ["#FF6384", "#36A2EB"],
                  },
                ],
              }}
              options={{
                aspectRatio: 2.5,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
