import AuthForm from "../components/AuthForm";

export default function LoginPage() {
  return <AuthForm mode="login" />;
}

"use client";
import { useEffect } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then((res) => {
      if (res.data.user) router.push("/chat");
    });
  }, []);

  return <AuthForm mode="login" />;
}
