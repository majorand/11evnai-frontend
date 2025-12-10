export default function MessageBubble({
  sender,
  content,
}: {
  sender: "user" | "ai";
  content: string;
}) {
  const isUser = sender === "user";

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-xl p-3 my-2 rounded-lg text-sm ${
          isUser
            ? "bg-brand text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        }`}
      >
        {content}
      </div>
    </div>
  );
}
