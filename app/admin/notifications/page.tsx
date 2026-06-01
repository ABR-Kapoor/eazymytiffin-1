"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
<<<<<<< HEAD
import { Bell, Search, Filter, Trash2, RefreshCw, Send, ArrowRight, ClipboardList, Megaphone, User } from "lucide-react";
import { CustomSelect } from "@/components/CustomSelect";
=======
import { Send, Bell } from "lucide-react";
>>>>>>> 21ee6eafa5645584d057b626d86c88c24d1d1434

type Notification = {
  id: string; title: string; body: string; type: string; channel: string; is_read: boolean; created_at: string;
  user: { full_name: string } | null;
};

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [users, setUsers] = useState<{ id: string; full_name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ userId: "all", title: "", body: "", type: "system", channel: "in_app" });
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type }); setTimeout(() => setToast(null), 3000);
  };

  const fetchData = async () => {
    const { data: notifs } = await supabase
      .from("notifications").select("*, user:users(full_name)")
      .order("created_at", { ascending: false }).limit(50);
    setNotifications((notifs as any) || []);

    const { data: userList } = await supabase.from("users").select("id, full_name").eq("role", "customer").eq("status", "active");
    setUsers(userList || []);
    setLoading(false);
  };

  useEffect(() => { fetchData(); }, []);

  const handleSend = async () => {
    if (!form.title.trim() || !form.body.trim()) { showToast("Title and body required", "error"); return; }
    setSending(true);
    try {
      if (form.userId === "all") {
        // Broadcast to all active customers
        const inserts = users.map((u) => ({
          user_id: u.id, title: form.title, body: form.body,
          type: form.type, channel: form.channel,
        }));
        const { error } = await supabase.from("notifications").insert(inserts);
        if (error) throw error;
<<<<<<< HEAD
        showToast(`Sent to ${users.length} users successfully!`);
=======
        showToast(`Sent to ${users.length} users!`);
>>>>>>> 21ee6eafa5645584d057b626d86c88c24d1d1434
      } else {
        const { error } = await supabase.from("notifications").insert([{
          user_id: form.userId, title: form.title, body: form.body,
          type: form.type, channel: form.channel,
        }]);
        if (error) throw error;
<<<<<<< HEAD
        showToast("Notification sent successfully!");
=======
        showToast("Notification sent!");
>>>>>>> 21ee6eafa5645584d057b626d86c88c24d1d1434
      }
      setForm((f) => ({ ...f, title: "", body: "" }));
      fetchData();
    } catch (err: any) { showToast(err.message || "Send failed", "error"); }
    finally { setSending(false); }
  };

  const TYPE_COLORS: Record<string, string> = {
    system: "#9CA3AF", payment: "#1B5E30", delivery: "#E8392A", subscription: "#6366F1",
  };

  return (
    <div>
<<<<<<< HEAD
      {toast && <div style={{ position: "fixed", top: "20px", right: "20px", zIndex: 200, background: toast.type === "success" ? "#1B5E30" : "#E8392A", color: "white", borderRadius: "12px", padding: "12px 20px", fontSize: "13px", fontWeight: 600 }}>{toast.msg}</div>}

      <h1 className="font-extrabold text-[28px] text-[#1A1A1A] m-0 tracking-tight flex items-center gap-2 mb-8 animate-fade-up">
        <div className="w-10 h-10 rounded-xl bg-[#E8392A]/10 flex items-center justify-center text-[#E8392A]">
          <Bell size={20} />
        </div>
        Notifications
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Send panel */}
        <div className="card-lift bg-white rounded-[24px] p-6 shadow-sm border border-[rgba(212,184,150,0.2)] h-fit animate-fade-up" style={{ animationDelay: '0.1s' }}>
          <h2 className="font-extrabold text-lg mb-5 flex items-center gap-2 text-[#1A1A1A]">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[#E8392A]" style={{ background: "rgba(232, 57, 42, 0.1)" }}>
              <Bell size={16} />
            </div>
            Send Notification
          </h2>

          <div className="mb-4">
            <label className="text-[11px] font-bold text-[#9CA3AF] block mb-1.5 uppercase tracking-wider">Recipient</label>
            <CustomSelect 
              value={form.userId} 
              onChange={(val) => setForm((f) => ({ ...f, userId: val }))}
              options={[
                { value: "all", label: <span className="flex items-center gap-2"><Megaphone size={14} /> All Active Customers ({users.length})</span> },
                ...users.map(u => ({ value: u.id, label: <span className="flex items-center gap-2"><User size={14} /> {u.full_name}</span> }))
              ]}
            />
          </div>

          <div className="mb-4">
            <label className="text-[11px] font-bold text-[#9CA3AF] block mb-1.5 uppercase tracking-wider">Type</label>
            <CustomSelect 
              value={form.type} 
              onChange={(val) => setForm((f) => ({ ...f, type: val }))}
              options={[
                { value: "system", label: "System" },
                { value: "payment", label: "Payment" },
                { value: "delivery", label: "Delivery" },
                { value: "subscription", label: "Subscription" }
              ]}
            />
          </div>

          <div className="mb-4">
            <label className="text-[11px] font-bold text-[#9CA3AF] block mb-1.5 uppercase tracking-wider">Title</label>
            <input type="text" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="Notification title…"
              className="w-full px-4 py-3 rounded-xl border border-[rgba(212,184,150,0.3)] text-[13px] focus:outline-none focus:ring-2 focus:ring-[#E8392A] focus:border-transparent transition-all bg-white" />
          </div>

          <div className="mb-5">
            <label className="text-[11px] font-bold text-[#9CA3AF] block mb-1.5 uppercase tracking-wider">Message</label>
            <textarea value={form.body} onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
              rows={3} placeholder="Write your message…"
              className="w-full px-4 py-3 rounded-xl border border-[rgba(212,184,150,0.3)] text-[13px] focus:outline-none focus:ring-2 focus:ring-[#E8392A] focus:border-transparent transition-all bg-white resize-none" />
          </div>

          <button onClick={handleSend} disabled={sending}
            className="w-full py-3.5 bg-[#E8392A] hover:bg-[#C72E1F] text-white rounded-xl font-bold text-[14px] transition-all flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(232,57,42,0.2)] hover:shadow-[0_6px_16px_rgba(232,57,42,0.3)] disabled:opacity-60 disabled:cursor-not-allowed btn-glare">
=======
      {toast && <div style={{ position: "fixed", top: "20px", right: "20px", zIndex: 200, background: toast.type === "success" ? "#1B5E30" : "#E8392A", color: "white", borderRadius: "12px", padding: "12px 20px", fontSize: "13px", fontWeight: 600 }}>{toast.type === "success" ? "✅ " : "❌ "}{toast.msg}</div>}

      <h1 style={{ fontWeight: 900, fontSize: "24px", color: "#1A1A1A", marginBottom: "20px" }}>Notifications</h1>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "20px" }}>
        {/* Send panel */}
        <div style={{ background: "white", borderRadius: "20px", padding: "20px", border: "1px solid rgba(212,184,150,0.15)", height: "fit-content" }}>
          <h2 style={{ fontWeight: 800, fontSize: "16px", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
            <Bell size={18} style={{ color: "#E8392A" }} /> Send Notification
          </h2>

          <div style={{ marginBottom: "12px" }}>
            <label style={{ fontSize: "11px", fontWeight: 700, color: "#9CA3AF", display: "block", marginBottom: "4px" }}>Recipient</label>
            <select value={form.userId} onChange={(e) => setForm((f) => ({ ...f, userId: e.target.value }))}
              style={{ width: "100%", padding: "9px", borderRadius: "9px", border: "1px solid rgba(212,184,150,0.3)", fontSize: "13px", outline: "none" }}>
              <option value="all">📢 All Active Customers ({users.length})</option>
              {users.map((u) => <option key={u.id} value={u.id}>👤 {u.full_name}</option>)}
            </select>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label style={{ fontSize: "11px", fontWeight: 700, color: "#9CA3AF", display: "block", marginBottom: "4px" }}>Type</label>
            <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))}
              style={{ width: "100%", padding: "9px", borderRadius: "9px", border: "1px solid rgba(212,184,150,0.3)", fontSize: "13px", outline: "none" }}>
              <option value="system">System</option>
              <option value="payment">Payment</option>
              <option value="delivery">Delivery</option>
              <option value="subscription">Subscription</option>
            </select>
          </div>

          <div style={{ marginBottom: "12px" }}>
            <label style={{ fontSize: "11px", fontWeight: 700, color: "#9CA3AF", display: "block", marginBottom: "4px" }}>Title</label>
            <input type="text" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              placeholder="Notification title…"
              style={{ width: "100%", padding: "9px 12px", borderRadius: "9px", border: "1px solid rgba(212,184,150,0.3)", fontSize: "13px", outline: "none", boxSizing: "border-box" }} />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label style={{ fontSize: "11px", fontWeight: 700, color: "#9CA3AF", display: "block", marginBottom: "4px" }}>Message</label>
            <textarea value={form.body} onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
              rows={3} placeholder="Write your message…"
              style={{ width: "100%", padding: "9px 12px", borderRadius: "9px", border: "1px solid rgba(212,184,150,0.3)", fontSize: "13px", outline: "none", boxSizing: "border-box", resize: "none" }} />
          </div>

          <button onClick={handleSend} disabled={sending}
            style={{ width: "100%", padding: "12px", background: "#E8392A", color: "white", border: "none", borderRadius: "12px", fontWeight: 700, fontSize: "14px", cursor: sending ? "not-allowed" : "pointer", opacity: sending ? 0.6 : 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
>>>>>>> 21ee6eafa5645584d057b626d86c88c24d1d1434
            <Send size={16} /> {sending ? "Sending…" : "Send Notification"}
          </button>
        </div>

        {/* History */}
<<<<<<< HEAD
        <div className="lg:col-span-2 card-lift bg-white rounded-[24px] p-6 shadow-sm border border-[rgba(212,184,150,0.2)] animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="font-extrabold text-lg mb-5 flex items-center gap-2 text-[#1A1A1A]">
            <div className="w-8 h-8 rounded-lg bg-[#F4EBE0] flex items-center justify-center text-[#6B7280]">
              <ClipboardList size={16} />
            </div>
            Recent Notifications
          </h2>
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-10 h-10 border-4 border-[#E8392A] border-opacity-20 border-t-[#E8392A] rounded-full animate-spin mb-4" />
              <p className="text-[#9CA3AF] font-medium text-sm">Loading history…</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-2 no-scrollbar">
              {notifications.map((n) => (
                <div key={n.id} className="flex gap-4 p-4 rounded-[16px] bg-[#FDF9F3] border border-[rgba(212,184,150,0.2)] hover:bg-white hover:shadow-md transition-all duration-300 group relative overflow-hidden shrink-0 items-start">
                  <div className="absolute left-0 top-0 bottom-0 w-1 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: TYPE_COLORS[n.type] || "#9CA3AF" }} />
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: `${TYPE_COLORS[n.type]}15`, color: TYPE_COLORS[n.type] }}>
                    <Bell size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1.5">
                      <p className="font-bold text-[14px] text-[#1A1A1A] truncate pr-4">{n.title}</p>
                      <span className="text-[11px] font-medium text-[#9CA3AF] flex-shrink-0 whitespace-nowrap bg-white px-2 py-0.5 rounded-full border border-gray-100 shadow-sm">
                        {new Date(n.created_at).toLocaleString("en-IN", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" })}
                      </span>
                    </div>
                    <p className="text-[13px] text-[#6B7280] mb-3 leading-relaxed">{n.body}</p>
                    <div className="flex flex-wrap gap-2 items-center mt-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md" style={{ background: `${TYPE_COLORS[n.type]}15`, color: TYPE_COLORS[n.type] }}>
                        {n.type}
                      </span>
                      <span className="text-[11px] font-semibold text-[#6B7280] flex items-center gap-1.5 bg-white border border-gray-100 px-2 py-0.5 rounded-md shadow-sm">
                        <ArrowRight size={10} className="text-gray-400" /> {n.user?.full_name || "All Users"}
                      </span>
                      {!n.is_read && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-red-50 text-red-600 ml-auto">
                          Unread
                        </span>
                      )}
=======
        <div style={{ background: "white", borderRadius: "20px", padding: "20px", border: "1px solid rgba(212,184,150,0.15)" }}>
          <h2 style={{ fontWeight: 800, fontSize: "16px", marginBottom: "16px" }}>📋 Recent Notifications</h2>
          {loading ? (
            <p style={{ color: "#9CA3AF", textAlign: "center", padding: "40px 0" }}>Loading…</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "500px", overflowY: "auto" }}>
              {notifications.map((n) => (
                <div key={n.id} style={{ display: "flex", gap: "10px", padding: "12px", borderRadius: "12px", background: "#F8FAFC", border: "1px solid rgba(212,184,150,0.1)" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: TYPE_COLORS[n.type] || "#9CA3AF", flexShrink: 0, marginTop: "4px" }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <p style={{ fontWeight: 700, fontSize: "13px", color: "#1A1A1A", margin: 0 }}>{n.title}</p>
                      <span style={{ fontSize: "10px", color: "#9CA3AF", flexShrink: 0 }}>
                        {new Date(n.created_at).toLocaleString("en-IN", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" })}
                      </span>
                    </div>
                    <p style={{ fontSize: "12px", color: "#6B7280", margin: "3px 0 4px" }}>{n.body}</p>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <span style={{ fontSize: "10px", fontWeight: 700, background: `${TYPE_COLORS[n.type]}20`, color: TYPE_COLORS[n.type], borderRadius: "999px", padding: "2px 6px" }}>{n.type}</span>
                      <span style={{ fontSize: "10px", color: "#9CA3AF" }}>→ {n.user?.full_name || "All"}</span>
                      {!n.is_read && <span style={{ fontSize: "10px", fontWeight: 700, background: "rgba(239,68,68,0.1)", color: "#EF4444", borderRadius: "999px", padding: "2px 6px" }}>Unread</span>}
>>>>>>> 21ee6eafa5645584d057b626d86c88c24d1d1434
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
