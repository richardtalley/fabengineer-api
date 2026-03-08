export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    return res.status(200).json({
      ok: true,
      message: "save-quote endpoint is live"
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      quote_id,
      quote_name,
      project_name,
      quote_data,
      total_price
    } = req.body || {};

    return res.status(200).json({
      ok: true,
      message: "Quote received by API",
      quote_id: quote_id || null,
      quote_name: quote_name || null,
      project_name: project_name || null,
      total_price: total_price || null,
      has_quote_data: !!quote_data
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Server error",
      details: String(error)
    });
  }
}
