"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function NavBar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b">
      <div className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/chat">Chat</Link>
        {user && <Link href="/admin">Admin</Link>}
      </div>

      <div>
        {user ? (
          <button onClick={logout} className="text-red-500">
            Logout
          </button>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
