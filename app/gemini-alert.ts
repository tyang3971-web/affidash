/**
 * Gemini API 錯誤即時通知（透過 Telegram）
 * 當 Gemini API 發生錯誤時，即時推送到 Tina 的 Telegram
 */
const TG_TOKEN = process.env.TG_BOT_TOKEN || ''
const TG_CHAT  = process.env.TG_CHAT_ID   || ''

export async function alertGeminiError(project: string, route: string, error: string) {
  if (!TG_TOKEN || !TG_CHAT) return
  const msg = `⚠️ Gemini API 錯誤\n專案：${project}\n路由：${route}\n錯誤：${error.slice(0, 500)}\n時間：${new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })}`
  try {
    await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: TG_CHAT, text: msg }),
    })
  } catch { /* 通知失敗不影響主流程 */ }
}
