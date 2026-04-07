import Link from "next/link";

const features = [
  {
    icon: "🔗",
    title: "短連結管理",
    desc: "一鍵建立品牌短連結，集中管理所有導購連結",
  },
  {
    icon: "📊",
    title: "點擊追蹤",
    desc: "即時追蹤每條連結的點擊數據，掌握流量來源",
  },
  {
    icon: "🤖",
    title: "AI 比較表",
    desc: "輸入產品名稱，AI 自動生成專業比較表格",
  },
  {
    icon: "🇹🇼",
    title: "台灣平台優化",
    desc: "原生支援蝦皮、momo 等台灣主流電商平台",
  },
];

const faqs = [
  {
    q: "AffiDash 適合誰使用？",
    a: "任何經營聯盟行銷的部落客、YouTuber、社群經營者都適合使用。特別針對台灣市場優化，支援蝦皮、momo 等平台。",
  },
  {
    q: "免費方案有什麼限制？",
    a: "免費方案可管理最多 20 條導購連結，包含基本點擊追蹤。升級 Pro 可無限新增連結並使用 AI 比較表功能。",
  },
  {
    q: "AI 比較表如何運作？",
    a: "只需輸入 2-4 個產品名稱並選擇分類，AI 會自動產生包含規格、價格、優缺點的專業比較表，可直接嵌入文章。",
  },
  {
    q: "數據會保存在哪裡？",
    a: "目前數據儲存在瀏覽器本地端（localStorage），未來將支援雲端同步。",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="text-xl font-bold text-orange-500">AffiDash</span>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="text-sm text-gray-600 hover:text-orange-500 transition"
            >
              儀表板
            </Link>
            <Link
              href="/compare"
              className="text-sm text-gray-600 hover:text-orange-500 transition"
            >
              AI 比較表
            </Link>
            <Link
              href="/dashboard"
              className="text-sm bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              免費開始
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-gradient-to-b from-orange-50 to-white py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            管理所有導購連結
            <br />
            <span className="text-orange-500">追蹤點擊、AI 生成比較表</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            專為台灣聯盟行銷者打造的一站式工具。
            短連結管理、即時點擊追蹤、一鍵 AI 產品比較表。
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/dashboard"
              className="bg-orange-500 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-orange-600 transition shadow-lg shadow-orange-500/25"
            >
              免費開始使用
            </Link>
            <Link
              href="/compare"
              className="border border-orange-300 text-orange-600 px-8 py-3 rounded-lg text-lg font-medium hover:bg-orange-50 transition"
            >
              試用 AI 比較表
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            核心功能
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-lg transition"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-gray-600 text-sm">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo: Dashboard Preview */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">
            連結管理儀表板
          </h2>
          <p className="text-center text-gray-500 mb-10">即時追蹤所有導購連結的點擊數據</p>

          {/* Stats Demo */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <div className="text-sm text-gray-500 mb-1">今日點擊</div>
              <div className="text-3xl font-bold text-gray-900">28</div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <div className="text-sm text-gray-500 mb-1">本週點擊</div>
              <div className="text-3xl font-bold text-gray-900">198</div>
            </div>
            <div className="bg-white rounded-xl p-5 border border-gray-100">
              <div className="text-sm text-gray-500 mb-1">本月點擊</div>
              <div className="text-3xl font-bold text-orange-500">805</div>
            </div>
          </div>

          {/* Table Demo */}
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-4 py-3 font-medium text-gray-600">標題</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">短連結</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">平台</th>
                  <th className="text-right px-4 py-3 font-medium text-gray-600">點擊</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { title: 'Sony WH-1000XM5 降噪耳機', short: 'affi.dash/sony-xm5', platform: '蝦皮', color: 'bg-orange-100 text-orange-700', clicks: 342 },
                  { title: 'Dyson V15 吸塵器', short: 'affi.dash/dyson-v15', platform: 'momo', color: 'bg-pink-100 text-pink-700', clicks: 218 },
                  { title: 'Apple AirPods Pro 2', short: 'affi.dash/airpods-pro2', platform: 'Amazon', color: 'bg-blue-100 text-blue-700', clicks: 156 },
                  { title: '理膚寶水溫泉噴霧', short: 'affi.dash/lrp-spray', platform: '蝦皮', color: 'bg-orange-100 text-orange-700', clicks: 89 },
                ].map((item) => (
                  <tr key={item.short} className="border-b border-gray-50 hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-medium text-gray-900">{item.title}</td>
                    <td className="px-4 py-3 text-orange-500 font-mono text-xs">{item.short}</td>
                    <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded-full font-medium ${item.color}`}>{item.platform}</span></td>
                    <td className="px-4 py-3 text-right font-semibold text-gray-900">{item.clicks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center">
            <Link href="/dashboard" className="text-orange-500 font-medium hover:underline">
              進入儀表板體驗 →
            </Link>
          </div>
        </div>
      </section>

      {/* Demo: AI Compare Table */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-3">
            AI 產品比較表
          </h2>
          <p className="text-center text-gray-500 mb-10">輸入產品名稱，AI 自動生成專業比較表格，可直接嵌入文章</p>

          <div className="bg-white rounded-xl border border-gray-200 p-6 overflow-x-auto">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-medium">AI 生成範例</span>
              <span className="text-xs text-gray-400">分類：3C 降噪耳機</span>
            </div>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="bg-orange-50 px-4 py-3 text-left border border-gray-200 font-semibold text-gray-700">比較項目</th>
                  <th className="bg-orange-50 px-4 py-3 text-left border border-gray-200 font-semibold text-gray-700">Sony WH-1000XM5</th>
                  <th className="bg-orange-50 px-4 py-3 text-left border border-gray-200 font-semibold text-gray-700">Apple AirPods Max</th>
                  <th className="bg-orange-50 px-4 py-3 text-left border border-gray-200 font-semibold text-gray-700">Bose 700</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['價格', 'NT$9,490', 'NT$18,490', 'NT$11,900'],
                  ['降噪等級', '★★★★★', '★★★★★', '★★★★☆'],
                  ['續航力', '30 小時', '20 小時', '20 小時'],
                  ['重量', '250g', '384g', '250g'],
                  ['連線', 'Bluetooth 5.2', 'Bluetooth 5.0', 'Bluetooth 5.0'],
                  ['特色', '自適應降噪、Speak-to-Chat', 'Digital Crown 控制、空間音訊', '11 段降噪調整、語音助手'],
                  ['蝦皮佣金', '3.5%（約 NT$332）', '2.8%（約 NT$518）', '3.2%（約 NT$381）'],
                  ['推薦推廣', '⭐ 最佳性價比', '高單價高佣金', '中階穩定選擇'],
                ].map(([label, ...values]) => (
                  <tr key={label} className="hover:bg-gray-50">
                    <td className="px-4 py-2.5 border border-gray-200 font-medium text-gray-700 bg-gray-50">{label}</td>
                    {values.map((v, i) => (
                      <td key={i} className="px-4 py-2.5 border border-gray-200 text-gray-600">{v}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-6">
            <Link href="/compare" className="inline-block bg-orange-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-orange-600 transition shadow-lg shadow-orange-500/25">
              試用 AI 比較表 →
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            方案價格
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Free */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">免費</h3>
              <div className="text-4xl font-bold text-gray-900 mb-1">
                NT$0
              </div>
              <p className="text-sm text-gray-500 mb-6">永久免費</p>
              <ul className="space-y-3 text-sm text-gray-600 mb-8">
                <li>✓ 最多 20 條連結</li>
                <li>✓ 基本點擊追蹤</li>
                <li>✓ 蝦皮 / momo 支援</li>
                <li className="text-gray-400">✗ AI 比較表</li>
              </ul>
              <Link
                href="/dashboard"
                className="block text-center w-full border border-orange-300 text-orange-600 py-2 rounded-lg hover:bg-orange-50 transition"
              >
                免費開始
              </Link>
            </div>
            {/* Pro */}
            <div className="bg-white p-8 rounded-2xl border-2 border-orange-500 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-medium px-3 py-1 rounded-full">
                推薦
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Pro</h3>
              <div className="text-4xl font-bold text-gray-900 mb-1">
                NT$210
                <span className="text-base font-normal text-gray-500">
                  /月
                </span>
              </div>
              <p className="text-sm text-gray-500 mb-6">年繳更划算</p>
              <ul className="space-y-3 text-sm text-gray-600 mb-8">
                <li>✓ 無限連結</li>
                <li>✓ 進階點擊分析</li>
                <li>✓ 全平台支援</li>
                <li>✓ AI 比較表產生器</li>
              </ul>
              <button className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition">
                即將推出
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            常見問題
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-b border-gray-100 pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {faq.q}
                </h3>
                <p className="text-gray-600">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-100">
        <div className="max-w-6xl mx-auto text-center text-sm text-gray-500">
          © 2026 AffiDash. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
