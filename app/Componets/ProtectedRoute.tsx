"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Protected({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then((res) => {
      if (!res.data.user) router.push("/login");
      else setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;

  return <>{children}</>;
}
