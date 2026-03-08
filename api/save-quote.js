export default async function handler(req, res) {

  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
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
    } = req.body;

    console.log("Quote received:", {
      quote_name,
      project_name,
      total_price
    });

    return res.status(200).json({
      ok: true,
      message: "Quote received by API",
      quote_id: quote_id || null
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: "Server error"
    });

  }
}
