"use client";

import { useEffect, useState } from "react";
import Protected from "./components/Protected";
import { backend } from "../lib/api";
import AdminStatCard from "./components/AdminStatCard";
import AdminActivityFeed from "./components/AdminActivityFeed";
import AdminTable from "./components/AdminTable";
import Skeleton from "./components/Skeleton";
import { supabase } from "../lib/supabaseClient";


export default function AdminPage() {
  const [stats, setStats] = useState<any>(null);
  const [activity, setActivity] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  const load = async () => {
    const user = (await supabase.auth.getUser()).data.user;
    const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

    if (user?.email !== adminEmail) {
      setIsAdmin(false);
      return;
    }

    setIsAdmin(true);

    // load system stats
    const statsRes = await backend("/admin/stats");
    setStats((await statsRes.json()).stats);

    // load activity logs
    const activityRes = await backend("/admin/activity");
    setActivity((await activityRes.json()).activity);

    // load users
    const userRes = await backend("/admin/users");
    setUsers((await userRes.json()).users);
  };

  useEffect(() => {
    load();
  }, []);

  if (isAdmin === false)
    return (
      <div className="p-10 text-center text-red-600 text-xl font-semibold">
        Access denied: Admin only
      </div>
    );

 if (!stats)
  export default function AdminPage() {
  const [loading, setLoading] = useState(true);

  return (
    <Protected>
      <div className="max-w-5xl mx-auto mt-10 space-y-6">

        {loading ? (
          <>
            <Skeleton height="80px" />
            <Skeleton height="80px" />
            <Skeleton height="200px" />
          </>
        ) : (
          <>
            <AdminStatCard />
            <AdminActivityFeed />
            <AdminTable />
          </>
        )}

      </div>
    </Protected>
  );
}

