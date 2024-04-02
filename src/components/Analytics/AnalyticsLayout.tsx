import { useState } from "react";

type AnalyticsLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export function AnalyticsLayout({ title, children }: AnalyticsLayoutProps) {
  const [isclose, setIsClose] = useState(false);
  function toggleClose() {
    setIsClose(!isclose);
  }
  return (
    <div className="mb-5 rounded border bg-white">
      <div
        className="m-2 border p-5 hover:cursor-pointer hover:bg-gray-100"
        onClick={toggleClose}
      >
        {title}
      </div>
      {!isclose && (
        <>
          <div className="grid grid-cols-2 gap-4 p-5">{children}</div>
        </>
      )}
    </div>
  );
}
