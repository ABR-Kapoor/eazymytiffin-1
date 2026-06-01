"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import {
<<<<<<< HEAD
  Users,
  Package,
  TrendingUp,
  Pause,
  Clock,
  AlertTriangle,
  Truck,
  ChefHat,
  Wallet,
  RefreshCw,
  ArrowUpRight,
  Bike,
  ArrowRight,
  Bell,
  Zap,
=======
  Users, Package, TrendingUp, Pause, Clock, AlertTriangle,
  Truck, ChefHat, Wallet, RefreshCw, ArrowUpRight, Bike, Bell
>>>>>>> 21ee6eafa5645584d057b626d86c88c24d1d1434
} from "lucide-react";
import Link from "next/link";

type Stats = {
  activeSubscribers: number;
  pausedSubscriptions: number;
  todayRevenue: number;
  pendingOrders: number;
  failedPayments: number;
  totalUsers: number;
  activeDeliveries: number;
};

type Activity = {
  id: string;
  title: string;
  body: string;
  type: string;
  created_at: string;
};

type ActiveDelivery = {
  id: string;
  order_id: string;
  status: string;
  eta: string | null;
  delivery_boy: { full_name: string; phone: string } | null;
};

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  assigned: { bg: "rgba(14,165,233,0.1)", text: "#0EA5E9" },
  on_the_way: { bg: "rgba(232,57,42,0.1)", text: "#E8392A" },
  arriving: { bg: "rgba(245,166,35,0.1)", text: "#F59E0B" },
  delivered: { bg: "rgba(27,94,48,0.1)", text: "#1B5E30" },
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
<<<<<<< HEAD
    activeSubscribers: 0,
    pausedSubscriptions: 0,
    todayRevenue: 0,
    pendingOrders: 0,
    failedPayments: 0,
    totalUsers: 0,
    activeDeliveries: 0,
=======
    activeSubscribers: 0, pausedSubscriptions: 0, todayRevenue: 0,
    pendingOrders: 0, failedPayments: 0, totalUsers: 0, activeDeliveries: 0,
>>>>>>> 21ee6eafa5645584d057b626d86c88c24d1d1434
  });
  const [activity, setActivity] = useState<Activity[]>([]);
  const [deliveries, setDeliveries] = useState<ActiveDelivery[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const channelRef = useRef<any>(null);

  const fetchAll = async () => {
    try {
      const [
        { count: activeSubs },
        { count: pausedSubs },
        { count: pendingOrders },
        { count: failedPay },
        { count: totalUsers },
        { count: activeDeliv },
        { data: todayPayments },
        { data: recentNotifs },
        { data: liveDeliveries },
      ] = await Promise.all([
<<<<<<< HEAD
        supabase
          .from("subscriptions")
          .select("*", { count: "exact", head: true })
          .eq("status", "active"),
        supabase
          .from("subscriptions")
          .select("*", { count: "exact", head: true })
          .eq("status", "paused"),
        supabase
          .from("food_orders")
          .select("*", { count: "exact", head: true })
          .eq("status", "pending"),
        supabase
          .from("payments")
          .select("*", { count: "exact", head: true })
          .eq("payment_status", "failed"),
        supabase.from("users").select("*", { count: "exact", head: true }),
        supabase
          .from("delivery_assignments")
          .select("*", { count: "exact", head: true })
          .neq("status", "delivered"),
        supabase
          .from("payments")
          .select("amount")
          .eq("payment_status", "paid")
          .gte("created_at", new Date().toISOString().split("T")[0]),
        supabase
          .from("notifications")
          .select("id, title, body, type, created_at")
          .order("created_at", { ascending: false })
          .limit(10),
        supabase
          .from("delivery_assignments")
          .select("id, order_id, status, eta, delivery_boy_id")
          .neq("status", "delivered")
          .order("created_at", { ascending: false })
          .limit(8),
      ]);

      const todayRev = (todayPayments || []).reduce(
        (sum: number, p: any) => sum + (p.amount || 0),
        0,
      );

      // Fetch delivery boy details
      const deliveryBoyIds = (liveDeliveries || [])
        .map((d: any) => d.delivery_boy_id)
        .filter(Boolean);
      let boyMap: Record<string, any> = {};
      if (deliveryBoyIds.length > 0) {
        const { data: boys } = await supabase
          .from("users")
          .select("id, full_name, phone")
          .in("id", deliveryBoyIds);
        (boys || []).forEach((b: any) => {
          boyMap[b.id] = b;
        });
=======
        supabase.from("subscriptions").select("*", { count: "exact", head: true }).eq("status", "active"),
        supabase.from("subscriptions").select("*", { count: "exact", head: true }).eq("status", "paused"),
        supabase.from("food_orders").select("*", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("payments").select("*", { count: "exact", head: true }).eq("payment_status", "failed"),
        supabase.from("users").select("*", { count: "exact", head: true }),
        supabase.from("delivery_assignments").select("*", { count: "exact", head: true }).neq("status", "delivered"),
        supabase.from("payments").select("amount").eq("payment_status", "paid")
          .gte("created_at", new Date().toISOString().split("T")[0]),
        supabase.from("notifications").select("id, title, body, type, created_at")
          .order("created_at", { ascending: false }).limit(10),
        supabase.from("delivery_assignments").select("id, order_id, status, eta, delivery_boy_id")
          .neq("status", "delivered").order("created_at", { ascending: false }).limit(8),
      ]);

      const todayRev = (todayPayments || []).reduce((sum: number, p: any) => sum + (p.amount || 0), 0);

      // Fetch delivery boy details
      const deliveryBoyIds = (liveDeliveries || []).map((d: any) => d.delivery_boy_id).filter(Boolean);
      let boyMap: Record<string, any> = {};
      if (deliveryBoyIds.length > 0) {
        const { data: boys } = await supabase.from("users").select("id, full_name, phone").in("id", deliveryBoyIds);
        (boys || []).forEach((b: any) => { boyMap[b.id] = b; });
>>>>>>> 21ee6eafa5645584d057b626d86c88c24d1d1434
      }

      setStats({
        activeSubscribers: activeSubs || 0,
        pausedSubscriptions: pausedSubs || 0,
        todayRevenue: todayRev,
        pendingOrders: pendingOrders || 0,
        failedPayments: failedPay || 0,
        totalUsers: totalUsers || 0,
        activeDeliveries: activeDeliv || 0,
      });
      setActivity(recentNotifs || []);
<<<<<<< HEAD
      setDeliveries(
        (liveDeliveries || []).map((d: any) => ({
          ...d,
          delivery_boy: boyMap[d.delivery_boy_id] || null,
        })),
      );
=======
      setDeliveries((liveDeliveries || []).map((d: any) => ({
        ...d, delivery_boy: boyMap[d.delivery_boy_id] || null,
      })));
>>>>>>> 21ee6eafa5645584d057b626d86c88c24d1d1434
      setLastRefresh(new Date());
    } catch (err) {
      console.error("[Admin dashboard] fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAll();
    // Realtime: listen to notifications for live feed
    channelRef.current = supabase
      .channel("admin:dashboard")
<<<<<<< HEAD
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications" },
        (payload) => {
          setActivity((prev) =>
            [payload.new as Activity, ...prev].slice(0, 10),
          );
        },
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "food_orders" },
        () => {
          fetchAll();
        },
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "subscriptions" },
        () => {
          fetchAll();
        },
      )
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "delivery_assignments" },
        () => {
          fetchAll();
        },
      )
=======
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "notifications" }, (payload) => {
        setActivity((prev) => [payload.new as Activity, ...prev].slice(0, 10));
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "food_orders" }, () => {
        fetchAll();
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "subscriptions" }, () => {
        fetchAll();
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "delivery_assignments" }, () => {
        fetchAll();
      })
>>>>>>> 21ee6eafa5645584d057b626d86c88c24d1d1434
      .subscribe();

    return () => {
      if (channelRef.current) supabase.removeChannel(channelRef.current);
    };
  }, []);

  const STAT_CARDS = [
<<<<<<< HEAD
    {
      label: "Active Subscribers",
      value: stats.activeSubscribers,
      icon: <ChefHat size={20} />,
      color: "#14B8A6",
      bg: "rgba(20,184,166,0.08)",
      href: "/admin/subscriptions?status=active",
    },
    {
      label: "Paused Plans",
      value: stats.pausedSubscriptions,
      icon: <Pause size={20} />,
      color: "#D97706",
      bg: "rgba(217,119,6,0.08)",
      href: "/admin/subscriptions?status=paused",
    },
    {
      label: "Today's Revenue",
      value: `₹${stats.todayRevenue.toLocaleString("en-IN")}`,
      icon: <Wallet size={20} />,
      color: "#1B5E30",
      bg: "rgba(27,94,48,0.08)",
      href: "/admin/analytics",
    },
    {
      label: "Pending Orders",
      value: stats.pendingOrders,
      icon: <Clock size={20} />,
      color: "#6366F1",
      bg: "rgba(99,102,241,0.08)",
      href: "/admin/orders?status=pending",
    },
    {
      label: "Failed Payments",
      value: stats.failedPayments,
      icon: <AlertTriangle size={20} />,
      color: "#EF4444",
      bg: "rgba(239,68,68,0.08)",
      href: "/admin/analytics",
    },
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: <Users size={20} />,
      color: "#0EA5E9",
      bg: "rgba(14,165,233,0.08)",
      href: "/admin/users",
    },
    {
      label: "Active Deliveries",
      value: stats.activeDeliveries,
      icon: <Truck size={20} />,
      color: "#8B5CF6",
      bg: "rgba(139,92,246,0.08)",
      href: "/admin/deliveries",
    },
  ];

  const NOTIF_TYPE_COLORS: Record<string, string> = {
    payment: "#1B5E30",
    delivery: "#E8392A",
    subscription: "#6366F1",
    system: "#9CA3AF",
=======
    { label: "Active Subscribers", value: stats.activeSubscribers, icon: <ChefHat size={20} />, color: "#E8392A", bg: "rgba(232,57,42,0.08)", href: "/admin/subscriptions?status=active" },
    { label: "Paused Plans", value: stats.pausedSubscriptions, icon: <Pause size={20} />, color: "#D97706", bg: "rgba(217,119,6,0.08)", href: "/admin/subscriptions?status=paused" },
    { label: "Today's Revenue", value: `₹${stats.todayRevenue.toLocaleString("en-IN")}`, icon: <Wallet size={20} />, color: "#1B5E30", bg: "rgba(27,94,48,0.08)", href: "/admin/analytics" },
    { label: "Pending Orders", value: stats.pendingOrders, icon: <Clock size={20} />, color: "#6366F1", bg: "rgba(99,102,241,0.08)", href: "/admin/orders?status=pending" },
    { label: "Failed Payments", value: stats.failedPayments, icon: <AlertTriangle size={20} />, color: "#EF4444", bg: "rgba(239,68,68,0.08)", href: "/admin/analytics" },
    { label: "Total Users", value: stats.totalUsers, icon: <Users size={20} />, color: "#0EA5E9", bg: "rgba(14,165,233,0.08)", href: "/admin/users" },
    { label: "Active Deliveries", value: stats.activeDeliveries, icon: <Truck size={20} />, color: "#8B5CF6", bg: "rgba(139,92,246,0.08)", href: "/admin/deliveries" },
  ];

  const NOTIF_TYPE_COLORS: Record<string, string> = {
    payment: "#1B5E30", delivery: "#E8392A", subscription: "#6366F1", system: "#9CA3AF",
>>>>>>> 21ee6eafa5645584d057b626d86c88c24d1d1434
  };

  return (
    <div>
      {/* Header row */}
<<<<<<< HEAD
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 animate-fade-up">
        <div>
          <h1 className="font-extrabold text-[28px] text-[#1A1A1A] m-0 tracking-tight flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#E8392A]/10 flex items-center justify-center text-[#E8392A]">
              <Zap size={20} />
            </div>
            Operations Center
          </h1>
          <p className="text-[#9CA3AF] text-[13px] mt-1.5 font-medium ml-[48px]">
=======
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <div>
          <h1 style={{ fontWeight: 900, fontSize: "28px", color: "#1A1A1A", margin: 0, letterSpacing: "-0.02em" }}>
            Operations Center
          </h1>
          <p style={{ color: "#9CA3AF", fontSize: "13px", margin: "4px 0 0" }}>
>>>>>>> 21ee6eafa5645584d057b626d86c88c24d1d1434
            Last updated: {lastRefresh.toLocaleTimeString("en-IN")}
          </p>
        </div>
        <button
          onClick={fetchAll}
<<<<<<< HEAD
          className="btn-glare flex items-center justify-center gap-2 bg-white border border-[rgba(212,184,150,0.3)] hover:border-[#E8392A] hover:text-[#E8392A] text-[#4A3A2A] rounded-xl px-5 py-2.5 text-[13px] font-bold shadow-sm transition-all h-fit w-fit"
        >
          <RefreshCw size={16} /> Refresh
=======
          style={{ display: "flex", alignItems: "center", gap: "6px", background: "white", border: "1px solid rgba(212,184,150,0.3)", borderRadius: "10px", padding: "8px 14px", fontSize: "12px", fontWeight: 700, color: "#4A3A2A", cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
        >
          <RefreshCw size={14} /> Refresh
>>>>>>> 21ee6eafa5645584d057b626d86c88c24d1d1434
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "80px" }}>
<<<<<<< HEAD
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "3px solid rgba(232,57,42,0.2)",
              borderTopColor: "#E8392A",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 16px",
            }}
          />
=======
          <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "3px solid rgba(232,57,42,0.2)", borderTopColor: "#E8392A", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
>>>>>>> 21ee6eafa5645584d057b626d86c88c24d1d1434
          <p style={{ color: "#9CA3AF" }}>Loading dashboard…</p>
        </div>
      ) : (
        <>
          {/* Stats grid */}
<<<<<<< HEAD
          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-8 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            {STAT_CARDS.map((card, i) => (
              <Link
                key={card.label}
                href={card.href}
                className="no-underline block group animate-fade-up"
                style={{ animationDelay: `${0.1 + i * 0.05}s` }}
              >
                <div
                  className="card-lift rounded-[24px] p-6 shadow-sm relative overflow-hidden h-full flex flex-col"
                  style={{
                    background: `linear-gradient(135deg, ${card.color}12, ${card.color}03)`,
                    border: `1px solid ${card.color}25`,
                  }}
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white to-transparent opacity-50 pointer-events-none rounded-bl-full transition-transform duration-500 group-hover:scale-110" />

                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div
                      className="w-12 h-12 rounded-[16px] flex items-center justify-center relative transition-transform group-hover:scale-110 duration-300 ease-out"
                      style={{
                        background: `${card.color}15`,
                        color: card.color,
                      }}
                    >
                      {card.icon}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center group-hover:bg-white transition-colors duration-300">
                      <ArrowUpRight size={16} style={{ color: card.color }} />
                    </div>
                  </div>

                  <div className="mt-auto relative z-10">
                    <p className="font-bold text-3xl text-[#121212] mb-1 tracking-tight">
                      {card.value}
                    </p>
                    <p className="text-xs font-bold text-[#6B7280] uppercase tracking-wider m-0">
                      {card.label}
                    </p>
                  </div>
=======
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "14px", marginBottom: "28px" }}>
            {STAT_CARDS.map((card) => (
              <Link key={card.label} href={card.href} style={{ textDecoration: "none" }}>
                <div
                  style={{ background: "white", borderRadius: "16px", padding: "18px", border: "1px solid rgba(212,184,150,0.15)", boxShadow: "0 1px 6px rgba(0,0,0,0.06)", cursor: "pointer", transition: "transform 200ms, box-shadow 200ms" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 1px 6px rgba(0,0,0,0.06)"; }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: card.bg, display: "flex", alignItems: "center", justifyContent: "center", color: card.color }}>{card.icon}</div>
                    <ArrowUpRight size={14} style={{ color: "#D1D5DB" }} />
                  </div>
                  <p style={{ fontWeight: 900, fontSize: "24px", color: "#1A1A1A", margin: "0 0 4px", letterSpacing: "-0.02em" }}>{card.value}</p>
                  <p style={{ fontSize: "11px", color: "#9CA3AF", fontWeight: 600, margin: 0 }}>{card.label}</p>
>>>>>>> 21ee6eafa5645584d057b626d86c88c24d1d1434
                </div>
              </Link>
            ))}
          </div>

          {/* Two column: Activity + Deliveries */}
<<<<<<< HEAD
          <div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            {/* Activity Feed */}
            <div className="bg-white rounded-[24px] p-6 border border-[rgba(212,184,150,0.2)] shadow-sm">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <h2 className="flex items-center gap-2 font-extrabold text-[16px] text-[#1A1A1A] m-0">
                  <Bell size={18} className="text-[#6366F1]" /> Live Activity
                </h2>
                <div className="w-2.5 h-2.5 rounded-full bg-[#22C55E] shadow-[0_0_8px_#22C55E] animate-pulse" />
              </div>
              {activity.length === 0 ? (
                <div className="text-center py-12 text-[#D1D5DB]">
                  <Bell size={40} className="mx-auto mb-3 opacity-50" />
                  <p className="text-[14px] font-medium m-0">No activity yet</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3 max-h-[360px] overflow-y-auto no-scrollbar pr-2">
                  {activity.map((a) => (
                    <div
                      key={a.id}
                      className="flex gap-4 p-4 rounded-2xl bg-[#F8FAFC] border border-gray-100 hover:border-gray-200 transition-colors"
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0"
                        style={{
                          background: NOTIF_TYPE_COLORS[a.type] || "#9CA3AF",
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-[13px] text-[#1A1A1A] m-0">
                          {a.title}
                        </p>
                        <p className="text-[12px] text-[#6B7280] m-0 mt-0.5 truncate">
                          {a.body}
                        </p>
                      </div>
                      <p className="text-[11px] font-bold text-[#9CA3AF] shrink-0 m-0 mt-0.5">
                        {new Date(a.created_at).toLocaleTimeString("en-IN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
=======
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
            {/* Activity Feed */}
            <div style={{ background: "white", borderRadius: "20px", padding: "20px", border: "1px solid rgba(212,184,150,0.15)", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <h2 style={{ fontWeight: 800, fontSize: "15px", color: "#1A1A1A", margin: 0 }}>🔔 Live Activity</h2>
                <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 8px #22C55E", animation: "pulse 2s infinite" }} />
              </div>
              {activity.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0", color: "#D1D5DB" }}>
                  <Bell size={32} style={{ margin: "0 auto 8px" }} />
                  <p style={{ fontSize: "13px" }}>No activity yet</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "340px", overflowY: "auto" }}>
                  {activity.map((a) => (
                    <div key={a.id} style={{ display: "flex", gap: "10px", padding: "10px", borderRadius: "10px", background: "#F8FAFC" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: NOTIF_TYPE_COLORS[a.type] || "#9CA3AF", flexShrink: 0, marginTop: "5px" }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontWeight: 700, fontSize: "12px", color: "#1A1A1A", margin: 0 }}>{a.title}</p>
                        <p style={{ fontSize: "11px", color: "#9CA3AF", margin: "2px 0 0", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.body}</p>
                      </div>
                      <p style={{ fontSize: "10px", color: "#D1D5DB", flexShrink: 0, margin: "3px 0 0" }}>
                        {new Date(a.created_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
>>>>>>> 21ee6eafa5645584d057b626d86c88c24d1d1434
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Active Deliveries */}
<<<<<<< HEAD
            <div className="bg-white rounded-[24px] p-6 border border-[rgba(212,184,150,0.2)] shadow-sm">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                <h2 className="flex items-center gap-2 font-extrabold text-[16px] text-[#1A1A1A] m-0">
                  <Bike size={18} className="text-[#E8392A]" /> Live Deliveries
                </h2>
                <Link
                  href="/admin/deliveries"
                  className="text-[12px] font-bold text-[#E8392A] hover:text-[#B91C1C] transition-colors inline-flex items-center gap-1"
                >
                  View all <ArrowRight size={12} />
                </Link>
              </div>
              {deliveries.length === 0 ? (
                <div className="text-center py-12 text-[#D1D5DB]">
                  <Truck size={40} className="mx-auto mb-3 opacity-50" />
                  <p className="text-[14px] font-medium m-0">
                    No active deliveries
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3 max-h-[360px] overflow-y-auto no-scrollbar pr-2">
                  {deliveries.map((d) => {
                    const sc = STATUS_COLORS[d.status] || {
                      bg: "rgba(156,163,175,0.1)",
                      text: "#6B7280",
                    };
                    return (
                      <div
                        key={d.id}
                        className="flex items-center gap-4 p-4 rounded-2xl bg-[#F8FAFC] border hover:shadow-sm transition-all"
                        style={{ borderColor: sc.bg }}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                          style={{ background: sc.bg, color: sc.text }}
                        >
                          <Bike size={18} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-[13px] text-[#1A1A1A] m-0">
                            {d.delivery_boy?.full_name || "Unassigned"}
                          </p>
                          <p className="text-[11px] font-semibold text-[#9CA3AF] m-0 mt-0.5">
                            Order #{d.order_id.slice(0, 8).toUpperCase()}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span
                            className="inline-block text-[10px] font-extrabold rounded-md px-2 py-1 uppercase tracking-wider"
                            style={{ background: sc.bg, color: sc.text }}
                          >
                            {d.status.replace(/_/g, " ")}
                          </span>
                          {d.eta && (
                            <p className="text-[10px] font-bold text-[#9CA3AF] m-0 mt-1">
                              {d.eta}
                            </p>
                          )}
=======
            <div style={{ background: "white", borderRadius: "20px", padding: "20px", border: "1px solid rgba(212,184,150,0.15)", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <h2 style={{ fontWeight: 800, fontSize: "15px", color: "#1A1A1A", margin: 0 }}>🚴 Live Deliveries</h2>
                <Link href="/admin/deliveries" style={{ fontSize: "11px", fontWeight: 700, color: "#E8392A", textDecoration: "none" }}>View all →</Link>
              </div>
              {deliveries.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px 0", color: "#D1D5DB" }}>
                  <Truck size={32} style={{ margin: "0 auto 8px" }} />
                  <p style={{ fontSize: "13px" }}>No active deliveries</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "340px", overflowY: "auto" }}>
                  {deliveries.map((d) => {
                    const sc = STATUS_COLORS[d.status] || { bg: "rgba(156,163,175,0.1)", text: "#6B7280" };
                    return (
                      <div key={d.id} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "10px", background: "#F8FAFC", border: `1px solid ${sc.bg}` }}>
                        <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: sc.bg, display: "flex", alignItems: "center", justifyContent: "center", color: sc.text, fontSize: "16px", flexShrink: 0 }}>🛵</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontWeight: 700, fontSize: "12px", color: "#1A1A1A", margin: 0 }}>
                            {d.delivery_boy?.full_name || "Unassigned"}
                          </p>
                          <p style={{ fontSize: "11px", color: "#9CA3AF", margin: "1px 0 0" }}>
                            Order #{d.order_id.slice(0, 8).toUpperCase()}
                          </p>
                        </div>
                        <div style={{ textAlign: "right", flexShrink: 0 }}>
                          <span style={{ display: "inline-block", fontSize: "10px", fontWeight: 700, background: sc.bg, color: sc.text, borderRadius: "999px", padding: "3px 8px", textTransform: "capitalize" }}>
                            {d.status.replace(/_/g, " ")}
                          </span>
                          {d.eta && <p style={{ fontSize: "10px", color: "#9CA3AF", margin: "3px 0 0" }}>{d.eta}</p>}
>>>>>>> 21ee6eafa5645584d057b626d86c88c24d1d1434
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions */}
<<<<<<< HEAD
          <div
            className="bg-white rounded-[24px] p-6 border border-[rgba(212,184,150,0.2)] shadow-sm animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <h2 className="flex items-center gap-2 font-extrabold text-[16px] text-[#1A1A1A] mb-5">
              <Zap size={18} className="text-[#F59E0B]" /> Quick Navigation
            </h2>
            <div className="flex flex-wrap gap-3">
              {[
                {
                  href: "/admin/subscriptions",
                  label: "Manage Subscriptions",
                  color: "#E8392A",
                  icon: <Users size={16} />,
                },
                {
                  href: "/admin/orders",
                  label: "Process Orders",
                  color: "#6366F1",
                  icon: <Package size={16} />,
                },
                {
                  href: "/admin/deliveries",
                  label: "Assign Deliveries",
                  color: "#0EA5E9",
                  icon: <Truck size={16} />,
                },
                {
                  href: "/admin/food-delivery",
                  label: "Update Menu",
                  color: "#1B5E30",
                  icon: <ChefHat size={16} />,
                },
                {
                  href: "/admin/analytics",
                  label: "View Analytics",
                  color: "#D97706",
                  icon: <TrendingUp size={16} />,
                },
                {
                  href: "/admin/notifications",
                  label: "Send Notification",
                  color: "#8B5CF6",
                  icon: <Bell size={16} />,
                },
=======
          <div style={{ background: "white", borderRadius: "20px", padding: "20px", border: "1px solid rgba(212,184,150,0.15)", boxShadow: "0 1px 6px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontWeight: 800, fontSize: "15px", color: "#1A1A1A", marginBottom: "14px" }}>⚡ Quick Navigation</h2>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {[
                { href: "/admin/subscriptions", label: "🍱 Manage Subscriptions", color: "#E8392A" },
                { href: "/admin/orders", label: "📦 Process Orders", color: "#6366F1" },
                { href: "/admin/deliveries", label: "🛵 Assign Deliveries", color: "#0EA5E9" },
                { href: "/admin/meals", label: "🍲 Update Menu", color: "#1B5E30" },
                { href: "/admin/users", label: "👥 Manage Users", color: "#D97706" },
                { href: "/admin/notifications", label: "🔔 Send Notification", color: "#8B5CF6" },
>>>>>>> 21ee6eafa5645584d057b626d86c88c24d1d1434
              ].map((a) => (
                <Link
                  key={a.href}
                  href={a.href}
<<<<<<< HEAD
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-gray-200 text-[13px] font-bold text-[#4B5563] no-underline hover:border-gray-300 hover:shadow-sm hover:-translate-y-0.5 transition-all"
                >
                  <span style={{ color: a.color }}>{a.icon}</span>
=======
                  style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "8px 16px", borderRadius: "10px", background: "var(--emt-cream, #FDF9F3)", border: "1px solid rgba(212,184,150,0.2)", fontSize: "12px", fontWeight: 700, color: "#1A1A1A", textDecoration: "none", transition: "all 150ms ease" }}
                >
>>>>>>> 21ee6eafa5645584d057b626d86c88c24d1d1434
                  {a.label}
                </Link>
              ))}
            </div>
          </div>
        </>
      )}

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
      `}</style>
    </div>
  );
}
