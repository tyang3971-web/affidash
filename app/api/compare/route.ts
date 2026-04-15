import { NextRequest } from "next/server";
import { alertGeminiError } from "@/app/gemini-alert";

function getApiKeys(): string[] {
  const keys: string[] = [];
  // 主 key
  if (process.env.GEMINI_API_KEY) keys.push(process.env.GEMINI_API_KEY);
  // 備用 keys
  if (process.env.GEMINI_API_KEY_2) keys.push(process.env.GEMINI_API_KEY_2);
  if (process.env.GEMINI_API_KEY_3) keys.push(process.env.GEMINI_API_KEY_3);
  if (process.env.GEMINI_API_KEY_4) keys.push(process.env.GEMINI_API_KEY_4);
  return keys;
}

export async function POST(request: NextRequest) {
  try {
    const { products, category } = await request.json();

    if (
      !Array.isArray(products) ||
      products.length < 2 ||
      products.length > 4
    ) {
      return Response.json(
        { error: "請提供 2-4 個產品名稱" },
        { status: 400 }
      );
    }

    const apiKeys = getApiKeys();
    if (apiKeys.length === 0) {
      return Response.json(
        { error: "API key 未設定" },
        { status: 500 }
      );
    }

    const prompt = `你是一位台灣的產品評測專家。請為以下${category}類產品產生一個 HTML 比較表格。

產品：${products.join("、")}

要求：
- 使用純 HTML <table> 標籤，不要 Markdown
- 欄位為每個產品名稱
- 列（row）包含：主要特色、價格範圍（台幣）、優點、缺點、最適合
- 價格用台幣 NT$ 表示
- 內容要客觀、具體、有參考價值
- 優缺點各列 2-3 點，用 <br> 換行
- 直接回傳 HTML，不要包含 \`\`\` 或其他標記`;

    // 輪替嘗試所有 key（只有 429/503 才輪替，其他錯誤直接回報真實原因）
    for (let i = 0; i < apiKeys.length; i++) {
      const apiKey = apiKeys[i];
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 2048,
              },
            }),
          }
        );

        if (!res.ok) {
          const errBody = await res.text();
          console.error(`Gemini key ${i + 1}/${apiKeys.length} failed (HTTP ${res.status}):`, errBody);
          // 只有 429(額度) / 503(overload) 才輪替下一把 key；其他錯誤直接回真實訊息
          if (res.status !== 429 && res.status !== 503) {
            alertGeminiError("affidash", "/api/compare", `HTTP ${res.status}: ${errBody}`);
            return Response.json(
              { error: `Gemini API 錯誤 ${res.status}：${errBody.slice(0, 200)}` },
              { status: 502 }
            );
          }
          if (i === apiKeys.length - 1) {
            alertGeminiError("affidash", "/api/compare", errBody);
            return Response.json(
              { error: "AI 服務暫時無法使用，所有 API key 額度已用完" },
              { status: 502 }
            );
          }
          continue;
        }

        const data = await res.json();
        const text =
          data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

        let html = text;
        const tableMatch = text.match(/<table[\s\S]*<\/table>/i);
        if (tableMatch) {
          html = tableMatch[0];
        }

        return Response.json({ html });
      } catch (err) {
        console.error(`Gemini key ${i + 1} error:`, err);
        if (i === apiKeys.length - 1) throw err;
      }
    }

    return Response.json({ error: "AI 服務暫時無法使用" }, { status: 502 });
  } catch (err) {
    console.error("Compare API error:", err);
    return Response.json(
      { error: "伺服器錯誤" },
      { status: 500 }
    );
  }
}
