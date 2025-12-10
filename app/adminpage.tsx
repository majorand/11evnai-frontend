"use client";

import { useEffect, useState } from "react";
import Protected from "../components/Protected";
import { backend } from "../../lib/api";
import AdminStatCard from "../components/AdminStatCard";
import AdminActivityFeed from "../components/AdminActivityFeed";
import AdminTable from "../components/AdminTable";
import { supabase } from "../../lib/supabaseClient";

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
  return (
    <div className="max-w-5xl mx-auto mt-10 space-y-6">
      <Skeleton height="80px" />
      <Skeleton height="80px" />
      <Skeleton height="80px" />
      <Skeleton height="200px" />
    </div>
  );

    <Protected>
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-brand mb-6">Admin Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <AdminStatCard title="Total Users" value={stats.total_users} />
          <AdminStatCard title="Total Chats" value={stats.total_chats} />
          <AdminStatCard title="Total Messages" value={stats.total_messages} />
        </div>

        {/* Activity */}
        <AdminActivityFeed logs={activity} />

        {/* User List */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">User List</h2>
        <AdminTable
          headers={["id", "email", "created_at"]}
          rows={users}
        />
      </div>
    </Protected>
  );
}
