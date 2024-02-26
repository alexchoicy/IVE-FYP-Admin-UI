import { getParkingLots } from "~/data/Request/ParkingLotsRequest";

export function Home() {
  const handleClick = async () => {
    const data = await getParkingLots();
    console.log(data);
  };

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome </p>
      <p>Welcome to the home page</p>
      <button
        onClick={handleClick}
        className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
      >
        Click me
      </button>
    </div>
  );
}
