export default function AdminTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: any[];
}) {
  return (
    <div className="overflow-auto rounded border mt-6 bg-white">
      <table className="w-full text-left min-w-[600px]">
        <thead className="bg-gray-100 border-b">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="p-3 text-gray-700 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row: any, i: number) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              {headers.map((h, j) => (
                <td key={j} className="p-3 text-gray-700">
                  {row[h]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
