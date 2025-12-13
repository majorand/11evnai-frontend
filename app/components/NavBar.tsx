"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      if (!user) return;

      if (user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        setIsAdmin(true);
      }
    };

    checkAdmin();
  }, []);

  return (
    <nav className="flex gap-6 p-4 border-b">
      <Link href="/chat">Chat</Link>
      <Link href="/vision">Vision</Link>
      <Link href="/images">Images</Link>
      <Link href="/video">Video</Link>
      <Link href="/3d">3D</Link>

      {isAdmin && <Link href="/admin">Admin</Link>}
    </nav>
  );
}
