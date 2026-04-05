"use client";

import Link from "next/link";
import { useState } from "react";

const categories = ["3C", "家電", "美妝", "食品", "其他"];

export default function ComparePage() {
  const [products, setProducts] = useState("");
  const [category, setCategory] = useState("3C");
  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    const items = products
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);
    if (items.length < 2 || items.length > 4) {
      setError("請輸入 2-4 個產品名稱，每行一個");
      return;
    }
    setError("");
    setLoading(true);
    setHtml("");

    try {
      const res = await fetch("/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products: items, category }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "生成失敗");
      setHtml(data.html);
    } catch (err) {
      setError(err instanceof Error ? err.message : "生成失敗，請稍後再試");
    } finally {
      setLoading(false);
    }
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
              href="/dashboard"
              className="text-sm text-gray-600 hover:text-orange-500 transition"
            >
              儀表板
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          AI 產品比較表產生器
        </h1>
        <p className="text-gray-500 mb-8">
          輸入 2-4 個產品名稱，AI 自動產生專業比較表格
        </p>

        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                產品名稱（每行一個，2-4 個）
              </label>
              <textarea
                value={products}
                onChange={(e) => setProducts(e.target.value)}
                placeholder={"Sony WH-1000XM5\nApple AirPods Max\nBose 700"}
                rows={4}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                產品分類
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400 mb-4"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="w-full bg-orange-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "生成中..." : "產生比較表"}
              </button>
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-3">{error}</p>
          )}
        </div>

        {/* Result */}
        {html && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              比較結果
            </h2>
            <div
              className="overflow-x-auto prose prose-sm max-w-none [&_table]:w-full [&_table]:border-collapse [&_th]:bg-orange-50 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:border [&_th]:border-gray-200 [&_td]:px-3 [&_td]:py-2 [&_td]:border [&_td]:border-gray-200 [&_tr:hover]:bg-gray-50"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
