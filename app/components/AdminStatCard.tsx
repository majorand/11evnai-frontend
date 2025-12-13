export default function AdminStatCard({
  title,
  value,
}: {
  title: string;
  value: any;
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow border text-center">
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <div className="text-3xl font-bold text-brand mt-2">{value}</div>
    </div>
  );
}
