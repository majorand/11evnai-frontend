"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="px-6 py-4 bg-white border-b shadow-sm flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-brand">
        11evnai
      </Link>

      <div className="flex space-x-6 text-gray-700">
        <Link href="/chat">Chat</Link>
        <Link href="/vision">Vision</Link>
        <Link href="/audio">Audio</Link>
        <Link href="/images">Images</Link>
        <Link href="/video">Video</Link>
        <Link href="/3d">3D</Link>
        <Link href="/admin">Admin</Link>
      </div>
    </nav>
  );
}
