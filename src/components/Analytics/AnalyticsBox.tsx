type AnalyticsBoxProps = {
  children: React.ReactNode;
};

export function AnalyticsBox({ children }: AnalyticsBoxProps) {
  return <div className="m-2 rounded border bg-gray-200 p-2">{children}</div>;
}
