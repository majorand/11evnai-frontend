import { redirect } from "next/navigation";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export default async function AdminPage() {
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    redirect("/login");
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Protected admin content</p>
    </div>
  );
}
