import { NextRequest } from "next/server";

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

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
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

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
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
      console.error("Gemini API error:", errBody);
      return Response.json(
        { error: "AI 服務暫時無法使用" },
        { status: 502 }
      );
    }

    const data = await res.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    // Extract HTML table from response
    let html = text;
    const tableMatch = text.match(/<table[\s\S]*<\/table>/i);
    if (tableMatch) {
      html = tableMatch[0];
    }

    return Response.json({ html });
  } catch (err) {
    console.error("Compare API error:", err);
    return Response.json(
      { error: "伺服器錯誤" },
      { status: 500 }
    );
  }
}
