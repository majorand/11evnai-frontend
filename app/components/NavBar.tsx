"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function NavBar() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

      if (user && user.email === adminEmail) {
        setIsAdmin(true);
      }
    };

    checkAdmin();
  }, []);

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-brand">
          11evnai
        </Link>

        <div className="flex gap-6 text-sm font-medium">
          <Link href="/chatpage">Chat</Link>
          <Link href="/visionpage">Vision</Link>
          <Link href="/audiopage">Audio</Link>
          <Link href="/imagespage">Images</Link>
          <Link href="/videopage">Video</Link>
          <Link href="/3dpage">3D</Link>

          {isAdmin && <Link href="/adminpage">Admin</Link>}
        </div>
      </div>
    </nav>
  );
}
