export function ParkingLotPricesList({
  title,
  prices,
  onChange,
}: {
  title: string;
  prices: ParkingLotPrice[];
  onChange: (time: string, newPrice: string) => void;
}) {
  return (
    <>
      <div className="mb-4 text-2xl font-bold">{title}</div>
      {prices.map((price) => (
        <div
          key={price.time}
          className="mb-2 flex items-center justify-between"
        >
          <div className="font-medium">{price.time}</div>
          <input
            type="number"
            min={0}
            step={0.01}
            value={Number(price.price)}
            className="rounded border p-2"
            onChange={(e) => onChange(price.time, e.target.value)}
          />
        </div>
      ))}
    </>
  );
}
