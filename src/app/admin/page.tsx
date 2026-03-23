"use client";

import { useEffect, useState } from "react";
import { FolderOpen, Eye, EyeOff, TrendingUp } from "lucide-react";

interface Stats {
  total: number;
  published: number;
  draft: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ total: 0, published: 0, draft: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/portfolio?all=true")
      .then((res) => res.json())
      .then((data) => {
        const items = Array.isArray(data) ? data : [];
        setStats({
          total: items.length,
          published: items.filter((i: { published: boolean }) => i.published).length,
          draft: items.filter((i: { published: boolean }) => !i.published).length,
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const statCards = [
    {
      label: "Total Portfolio",
      value: stats.total,
      icon: FolderOpen,
      color: "text-primary-400",
      bg: "bg-primary-500/10",
      border: "border-primary-500/20",
    },
    {
      label: "Published",
      value: stats.published,
      icon: Eye,
      color: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/20",
    },
    {
      label: "Draft",
      value: stats.draft,
      icon: EyeOff,
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">
          Selamat datang di Admin Panel AMRT.dev
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`p-6 rounded-2xl border ${card.border} bg-glass backdrop-blur-sm`}
          >
            <div className="flex items-center justify-between mb-4">
              <div
                className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center`}
              >
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <TrendingUp className="w-4 h-4 text-gray-600" />
            </div>
            <p className="text-2xl font-bold text-white">
              {loading ? "..." : card.value}
            </p>
            <p className="text-sm text-gray-400 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Quick info */}
      <div className="p-6 rounded-2xl border border-glass-border bg-glass">
        <h2 className="text-lg font-semibold text-white mb-3">Panduan Cepat</h2>
        <ul className="space-y-2 text-sm text-gray-400">
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary-400" />
            Gunakan menu <strong className="text-white">Portfolio</strong> untuk
            menambah, edit, atau hapus karya.
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary-400" />
            Gunakan menu <strong className="text-white">Settings</strong> untuk
            mengubah nama situs, hero text, dan nomor WhatsApp.
          </li>
          <li className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-primary-400" />
            Perubahan akan langsung terlihat di halaman publik.
          </li>
        </ul>
      </div>
    </div>
  );
}
