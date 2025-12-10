export default function AdminActivityFeed({ logs }: { logs: any[] }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow border mt-6">
      <h3 className="text-xl font-semibold text-brand mb-4">
        Recent Activity
      </h3>

      <div className="space-y-3">
        {logs.map((log, i) => (
          <div
            key={i}
            className="p-3 border rounded bg-gray-50 text-gray-800"
          >
            <div className="font-semibold">Chat #{log.chat_id}</div>
            <div className="text-sm">{log.content}</div>
            <div className="text-xs text-gray-500 mt-1">{log.created_at}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
