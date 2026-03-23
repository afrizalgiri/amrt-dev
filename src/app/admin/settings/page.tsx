"use client";

import { useEffect, useState } from "react";
import { Save, Loader2, Upload, CheckCircle } from "lucide-react";
import Image from "next/image";

interface SiteConfig {
  id: string;
  siteName: string;
  logoUrl: string;
  heroTitle: string;
  heroSubtitle: string;
  whatsappNumber: string;
  servicesJson: string;
}

export default function AdminSettings() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        setConfig(data);
        setLoading(false);
      });
  }, []);

  const handleUploadLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !config) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (data.url) {
      setConfig({ ...config, logoUrl: data.url });
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config) return;
    setSaving(true);
    setSaved(false);

    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        siteName: config.siteName,
        logoUrl: config.logoUrl,
        heroTitle: config.heroTitle,
        heroSubtitle: config.heroSubtitle,
        whatsappNumber: config.whatsappNumber,
        servicesJson: config.servicesJson,
      }),
    });

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-primary-400" />
      </div>
    );
  }

  if (!config) return null;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-gray-400 text-sm mt-1">
          Atur konfigurasi website Anda
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
        {/* General */}
        <div className="p-6 rounded-2xl border border-glass-border bg-glass space-y-4">
          <h2 className="text-lg font-semibold text-white">Umum</h2>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">
              Nama Situs
            </label>
            <input
              type="text"
              value={config.siteName}
              onChange={(e) =>
                setConfig({ ...config, siteName: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-surface-900 border border-glass-border rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">
              Logo
            </label>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 px-4 py-2.5 bg-surface-900 border border-glass-border rounded-lg text-sm text-gray-400 hover:text-white hover:border-primary-500/30 cursor-pointer transition-all">
                <Upload className="w-4 h-4" />
                {uploading ? "Uploading..." : "Upload Logo"}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleUploadLogo}
                  className="hidden"
                />
              </label>
              {config.logoUrl && (
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-surface-900">
                  <Image
                    src={config.logoUrl}
                    alt="Logo"
                    width={40}
                    height={40}
                    className="object-contain w-full h-full"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="p-6 rounded-2xl border border-glass-border bg-glass space-y-4">
          <h2 className="text-lg font-semibold text-white">Hero Section</h2>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">
              Judul Hero
            </label>
            <input
              type="text"
              value={config.heroTitle}
              onChange={(e) =>
                setConfig({ ...config, heroTitle: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-surface-900 border border-glass-border rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">
              Subtitle Hero
            </label>
            <textarea
              value={config.heroSubtitle}
              onChange={(e) =>
                setConfig({ ...config, heroSubtitle: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-2.5 bg-surface-900 border border-glass-border rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all resize-none"
            />
          </div>
        </div>

        {/* Contact */}
        <div className="p-6 rounded-2xl border border-glass-border bg-glass space-y-4">
          <h2 className="text-lg font-semibold text-white">Kontak</h2>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1.5">
              Nomor WhatsApp
            </label>
            <input
              type="text"
              value={config.whatsappNumber}
              onChange={(e) =>
                setConfig({ ...config, whatsappNumber: e.target.value })
              }
              className="w-full px-4 py-2.5 bg-surface-900 border border-glass-border rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
              placeholder="6281234567890"
            />
            <p className="text-xs text-gray-500 mt-1">
              Format internasional tanpa + (contoh: 6281234567890)
            </p>
          </div>
        </div>

        {/* Services JSON */}
        <div className="p-6 rounded-2xl border border-glass-border bg-glass space-y-4">
          <h2 className="text-lg font-semibold text-white">Services (JSON)</h2>
          <div>
            <textarea
              value={config.servicesJson}
              onChange={(e) =>
                setConfig({ ...config, servicesJson: e.target.value })
              }
              rows={8}
              className="w-full px-4 py-2.5 bg-surface-900 border border-glass-border rounded-lg text-white text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all resize-none"
            />
            <p className="text-xs text-gray-500 mt-1">
              Array JSON dari services. Setiap item harus memiliki: title,
              description, icon (nama Lucide icon).
            </p>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white font-medium rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,102,255,0.3)]"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Simpan Perubahan
          </button>
          {saved && (
            <span className="flex items-center gap-1.5 text-sm text-green-400">
              <CheckCircle className="w-4 h-4" />
              Tersimpan!
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
