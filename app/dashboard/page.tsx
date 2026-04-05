"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

interface AffiLink {
  id: string;
  title: string;
  shortUrl: string;
  originalUrl: string;
  platform: "蝦皮" | "momo" | "Amazon" | "其他";
  clicks: number;
  clicksToday: number;
  clicksWeek: number;
  clicksMonth: number;
  createdAt: string;
}

const STORAGE_KEY = "affidash_links";

const sampleLinks: AffiLink[] = [
  {
    id: "1",
    title: "Sony WH-1000XM5 降噪耳機",
    shortUrl: "affi.dash/sony-xm5",
    originalUrl: "https://shopee.tw/product/123456",
    platform: "蝦皮",
    clicks: 342,
    clicksToday: 12,
    clicksWeek: 87,
    clicksMonth: 342,
    createdAt: "2026-03-15",
  },
  {
    id: "2",
    title: "Dyson V15 吸塵器",
    shortUrl: "affi.dash/dyson-v15",
    originalUrl: "https://www.momoshop.com.tw/goods/123",
    platform: "momo",
    clicks: 218,
    clicksToday: 8,
    clicksWeek: 52,
    clicksMonth: 218,
    createdAt: "2026-03-20",
  },
  {
    id: "3",
    title: "Apple AirPods Pro 2",
    shortUrl: "affi.dash/airpods-pro2",
    originalUrl: "https://www.amazon.com/dp/B0CHWRXH8B",
    platform: "Amazon",
    clicks: 156,
    clicksToday: 5,
    clicksWeek: 38,
    clicksMonth: 156,
    createdAt: "2026-03-25",
  },
  {
    id: "4",
    title: "理膚寶水溫泉噴霧",
    shortUrl: "affi.dash/lrp-spray",
    originalUrl: "https://shopee.tw/product/789012",
    platform: "蝦皮",
    clicks: 89,
    clicksToday: 3,
    clicksWeek: 21,
    clicksMonth: 89,
    createdAt: "2026-04-01",
  },
];

function detectPlatform(url: string): AffiLink["platform"] {
  if (url.includes("shopee")) return "蝦皮";
  if (url.includes("momo")) return "momo";
  if (url.includes("amazon")) return "Amazon";
  return "其他";
}

function generateShortUrl(title: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\u4e00-\u9fff]/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 20);
  return `affi.dash/${slug}-${Math.random().toString(36).slice(2, 6)}`;
}

export default function DashboardPage() {
  const [links, setLinks] = useState<AffiLink[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    originalUrl: "",
    platform: "蝦皮" as AffiLink["platform"],
  });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setLinks(JSON.parse(stored));
    } else {
      setLinks(sampleLinks);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleLinks));
    }
  }, []);

  const saveLinks = useCallback(
    (newLinks: AffiLink[]) => {
      setLinks(newLinks);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newLinks));
    },
    []
  );

  const handleSubmit = () => {
    if (!form.title || !form.originalUrl) return;

    if (editId) {
      const updated = links.map((l) =>
        l.id === editId
          ? {
              ...l,
              title: form.title,
              originalUrl: form.originalUrl,
              platform: form.platform,
            }
          : l
      );
      saveLinks(updated);
      setEditId(null);
    } else {
      const newLink: AffiLink = {
        id: Date.now().toString(),
        title: form.title,
        shortUrl: generateShortUrl(form.title),
        originalUrl: form.originalUrl,
        platform: detectPlatform(form.originalUrl) || form.platform,
        clicks: 0,
        clicksToday: 0,
        clicksWeek: 0,
        clicksMonth: 0,
        createdAt: new Date().toISOString().split("T")[0],
      };
      saveLinks([newLink, ...links]);
    }
    setForm({ title: "", originalUrl: "", platform: "蝦皮" });
    setShowForm(false);
  };

  const handleEdit = (link: AffiLink) => {
    setEditId(link.id);
    setForm({
      title: link.title,
      originalUrl: link.originalUrl,
      platform: link.platform,
    });
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    saveLinks(links.filter((l) => l.id !== id));
  };

  const totalToday = links.reduce((s, l) => s + l.clicksToday, 0);
  const totalWeek = links.reduce((s, l) => s + l.clicksWeek, 0);
  const totalMonth = links.reduce((s, l) => s + l.clicksMonth, 0);

  const platformColor: Record<string, string> = {
    蝦皮: "bg-orange-100 text-orange-700",
    momo: "bg-pink-100 text-pink-700",
    Amazon: "bg-blue-100 text-blue-700",
    其他: "bg-gray-100 text-gray-700",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-orange-500">
            AffiDash
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/compare"
              className="text-sm text-gray-600 hover:text-orange-500 transition"
            >
              AI 比較表
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <div className="text-sm text-gray-500 mb-1">今日點擊</div>
            <div className="text-3xl font-bold text-gray-900">{totalToday}</div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <div className="text-sm text-gray-500 mb-1">本週點擊</div>
            <div className="text-3xl font-bold text-gray-900">{totalWeek}</div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-100">
            <div className="text-sm text-gray-500 mb-1">本月點擊</div>
            <div className="text-3xl font-bold text-orange-500">
              {totalMonth}
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900">連結管理</h1>
          <button
            onClick={() => {
              setEditId(null);
              setForm({ title: "", originalUrl: "", platform: "蝦皮" });
              setShowForm(true);
            }}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition"
          >
            + 新增連結
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">
              {editId ? "編輯連結" : "新增連結"}
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  標題
                </label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  placeholder="例：Sony WH-1000XM5"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  原始連結
                </label>
                <input
                  type="url"
                  value={form.originalUrl}
                  onChange={(e) =>
                    setForm({ ...form, originalUrl: e.target.value })
                  }
                  placeholder="https://shopee.tw/..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  平台
                </label>
                <select
                  value={form.platform}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      platform: e.target.value as AffiLink["platform"],
                    })
                  }
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
                >
                  <option value="蝦皮">蝦皮</option>
                  <option value="momo">momo</option>
                  <option value="Amazon">Amazon</option>
                  <option value="其他">其他</option>
                </select>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button
                onClick={handleSubmit}
                className="bg-orange-500 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition"
              >
                {editId ? "儲存" : "新增"}
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditId(null);
                }}
                className="border border-gray-200 text-gray-600 px-6 py-2 rounded-lg text-sm hover:bg-gray-50 transition"
              >
                取消
              </button>
            </div>
          </div>
        )}

        {/* Links Table */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 font-medium text-gray-600">
                    標題
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">
                    短連結
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">
                    原始連結
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">
                    平台
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-gray-600">
                    點擊
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600 hidden md:table-cell">
                    建立日期
                  </th>
                  <th className="text-right px-4 py-3 font-medium text-gray-600">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody>
                {links.map((link) => (
                  <tr
                    key={link.id}
                    className="border-b border-gray-50 hover:bg-gray-50/50"
                  >
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {link.title}
                    </td>
                    <td className="px-4 py-3 text-orange-500 font-mono text-xs">
                      {link.shortUrl}
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-xs truncate max-w-[200px] hidden md:table-cell">
                      {link.originalUrl}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${platformColor[link.platform]}`}
                      >
                        {link.platform}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-900">
                      {link.clicks}
                    </td>
                    <td className="px-4 py-3 text-gray-500 hidden md:table-cell">
                      {link.createdAt}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => handleEdit(link)}
                        className="text-gray-400 hover:text-orange-500 transition mr-2"
                      >
                        編輯
                      </button>
                      <button
                        onClick={() => handleDelete(link.id)}
                        className="text-gray-400 hover:text-red-500 transition"
                      >
                        刪除
                      </button>
                    </td>
                  </tr>
                ))}
                {links.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-12 text-center text-gray-400"
                    >
                      尚無連結，點擊「新增連結」開始管理
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
