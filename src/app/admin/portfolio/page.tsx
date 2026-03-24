"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Upload,
  Eye,
  EyeOff,
  Save,
  Loader2,
} from "lucide-react";
import Image from "next/image";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  techStack: string;
  liveUrl: string;
  order: number;
  published: boolean;
}

const emptyForm: Omit<PortfolioItem, "id"> = {
  title: "",
  description: "",
  imageUrl: "",
  category: "",
  techStack: "",
  liveUrl: "",
  order: 0,
  published: true,
};

export default function AdminPortfolio() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    const res = await fetch("/api/portfolio?all=true");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();
    if (data.url) {
      setForm((prev) => ({ ...prev, imageUrl: data.url }));
    }
    setUploading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    if (editId) {
      await fetch("/api/portfolio", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editId, ...form }),
      });
    } else {
      await fetch("/api/portfolio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
    }

    await fetchItems();
    setShowModal(false);
    setEditId(null);
    setForm(emptyForm);
    setSaving(false);
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditId(item.id);
    setForm({
      title: item.title,
      description: item.description,
      imageUrl: item.imageUrl,
      category: item.category,
      techStack: item.techStack,
      liveUrl: item.liveUrl,
      order: item.order,
      published: item.published,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    await fetch(`/api/portfolio?id=${id}`, { method: "DELETE" });
    await fetchItems();
    setDeleteConfirm(null);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Portfolio</h1>
          <p className="text-gray-400 text-sm mt-1">
            Kelola item portofolio Anda
          </p>
        </div>
        <button
          onClick={() => {
            setEditId(null);
            setForm(emptyForm);
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,102,255,0.3)]"
        >
          <Plus className="w-4 h-4" />
          Tambah Baru
        </button>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-glass-border bg-glass overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-glass-border">
              <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">
                Project
              </th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">
                Category
              </th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">
                Status
              </th>
              <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">
                Order
              </th>
              <th className="text-right text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-glass-border">
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-gray-500">
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                </td>
              </tr>
            ) : items.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-gray-500">
                  Belum ada portfolio. Klik &quot;Tambah Baru&quot; untuk memulai.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-glass-hover transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface-800 overflow-hidden flex-shrink-0">
                        {item.imageUrl && (
                          <Image
                            src={item.imageUrl}
                            alt={item.title}
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                          />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-500 line-clamp-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 text-xs font-medium text-primary-300 bg-primary-500/10 border border-primary-500/10 rounded-md">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {item.published ? (
                      <span className="flex items-center gap-1.5 text-xs text-green-400">
                        <Eye className="w-3.5 h-3.5" /> Published
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-xs text-yellow-400">
                        <EyeOff className="w-3.5 h-3.5" /> Draft
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {item.order}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 text-gray-400 hover:text-primary-400 hover:bg-primary-500/10 rounded-lg transition-all"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(item.id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-surface-800 border border-glass-border rounded-2xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-white mb-2">
              Hapus Portfolio?
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              Item ini akan dihapus permanen dan tidak dapat dikembalikan.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-glass-border rounded-lg transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm overflow-y-auto py-8">
          <div className="bg-surface-800 border border-glass-border rounded-2xl p-6 max-w-lg w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">
                {editId ? "Edit Portfolio" : "Tambah Portfolio"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 text-gray-400 hover:text-white hover:bg-glass-hover rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">
                  Judul *
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, title: e.target.value }))
                  }
                  required
                  className="w-full px-4 py-2.5 bg-surface-900 border border-glass-border rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                  placeholder="Nama project"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">
                  Deskripsi *
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  required
                  rows={3}
                  className="w-full px-4 py-2.5 bg-surface-900 border border-glass-border rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all resize-none"
                  placeholder="Deskripsi project"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">
                  Gambar / Video
                </label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-4 py-2.5 bg-surface-900 border border-glass-border rounded-lg text-sm text-gray-400 hover:text-white hover:border-primary-500/30 cursor-pointer transition-all">
                    <Upload className="w-4 h-4" />
                    {uploading ? "Uploading..." : "Upload"}
                    <input
                      type="file"
                      accept="image/*,video/mp4,video/webm"
                      onChange={handleUpload}
                      className="hidden"
                    />
                  </label>
                  {form.imageUrl && !form.imageUrl.match(/\.(mp4|webm|mov)/i) && (
                    <div className="w-10 h-10 rounded-lg overflow-hidden bg-surface-900">
                      <Image
                        src={form.imageUrl}
                        alt="Preview"
                        width={40}
                        height={40}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <input
                    type="text"
                    value={form.imageUrl}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, imageUrl: e.target.value }))
                    }
                    className="flex-1 px-4 py-2.5 bg-surface-900 border border-glass-border rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                    placeholder="URL gambar atau video (.mp4/.webm) — hover-to-play otomatis"
                  />
                </div>
                <p className="text-[11px] text-gray-600 mt-1">
                  Upload video .mp4/.webm → otomatis play saat hover di portfolio
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">
                    Kategori *
                  </label>
                  <input
                    type="text"
                    value={form.category}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, category: e.target.value }))
                    }
                    required
                    className="w-full px-4 py-2.5 bg-surface-900 border border-glass-border rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                    placeholder="Web Development"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">
                    Order
                  </label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, order: parseInt(e.target.value) || 0 }))
                    }
                    className="w-full px-4 py-2.5 bg-surface-900 border border-glass-border rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">
                  Tech Stack
                </label>
                <input
                  type="text"
                  value={form.techStack}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, techStack: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 bg-surface-900 border border-glass-border rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                  placeholder="Next.js, Tailwind CSS, Prisma"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">
                  Live URL
                </label>
                <input
                  type="url"
                  value={form.liveUrl}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, liveUrl: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 bg-surface-900 border border-glass-border rounded-lg text-white text-sm placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                  placeholder="https://..."
                />
              </div>

              <div className="flex items-center gap-3">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.published}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, published: e.target.checked }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-surface-600 rounded-full peer peer-checked:bg-primary-500 transition-colors after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full" />
                </label>
                <span className="text-sm text-gray-400">Published</span>
              </div>

              <div className="flex gap-3 justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2.5 text-sm text-gray-400 hover:text-white border border-glass-border rounded-lg transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2.5 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-all duration-300"
                >
                  {saving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  {editId ? "Update" : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
