"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { backend } from "../../lib/api";

export default function AdminPage() {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const check = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;

      if (!user) {
        window.location.href = "/login";
        return;
      }

      if (user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        setAllowed(false);
        return;
      }

      setAllowed(true);
    };

    check();
  }, []);

  if (allowed === null) return <div className="p-10">Loading…</div>;

  if (allowed === false)
    return <div className="p-10 text-red-500">Not authorized</div>;

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p className="mt-4">You are signed in as admin.</p>
    </div>
  );
}
