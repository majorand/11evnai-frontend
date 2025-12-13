import Link from "next/link";

export default function Page() {
  return (
    <div className="text-center space-y-8">
      <h1 className="text-5xl font-bold text-brand">
        Welcome to 11evnai
      </h1>

      <p className="text-gray-600 max-w-2xl mx-auto">
        Your multimodal AI platform for chat, vision, audio, image editing,
        video generation, and 3D creation.
      </p>

      <div className="flex justify-center gap-4">
        <Link
          href="/chatpage"
          className="px-6 py-3 bg-brand text-white rounded-lg shadow"
        >
          Chat
        </Link>

        <Link
          href="/visionpage"
          className="px-6 py-3 bg-gray-200 rounded-lg"
        >
          Vision
        </Link>

        <Link
          href="/adminpage"
          className="px-6 py-3 bg-gray-200 rounded-lg"
        >
          Admin
        </Link>
      </div>
    </div>
  );
}
