"use client";

import { useEffect, useState } from "react";
import Protected from "./components/Protected";
import AdminStatCard from "./components/AdminStatCard";
import AdminActivityFeed from "./components/AdminActivityFeed";
import AdminTable from "./components/AdminTable";
import Skeleton from "./components/Skeleton";

import { supabase } from "../lib/supabaseClient";
import { backend } from "../lib/api";

type AdminStats = {
  users: number;
  images: number;
  videos: number;
};

export default function AdminPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [activity, setActivity] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.auth.getUser();
      const user = data.user;
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

      if (!user || user.email !== adminEmail) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      setIsAdmin(true);

      const statsRes = await backend("/admin/stats");
      const activityRes = await backend("/admin/activity");
      const usersRes = await backend("/admin/users");

      setStats((await statsRes.json()).stats);
      setActivity((await activityRes.json()).activity);
      setUsers((await usersRes.json()).users);

      setLoading(false);
    };

    load();
  }, []);

  return (
    <Protected>
      <div className="max-w-5xl mx-auto mt-10 space-y-6">
        {loading && (
          <>
            <Skeleton height="80px" />
            <Skeleton height="80px" />
            <Skeleton height="200px" />
          </>
        )}

        {!loading && isAdmin === false && (
          <div className="text-center text-red-500 font-semibold">
            You are not authorized to view this page.
          </div>
        )}

        {!loading && isAdmin && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <AdminStatCard title="Users" value={stats?.users ?? 0} />
              <AdminStatCard title="Images Generated" value={stats?.images ?? 0} />
              <AdminStatCard title="Videos Generated" value={stats?.videos ?? 0} />
            </div>

            <AdminActivityFeed activity={activity} />
            <AdminTable users={users} />
          </>
        )}
      </div>
    </Protected>
  );
}
