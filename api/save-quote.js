export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    const body = req.body;

    if (!body) {
      return res.status(400).json({ error: "Missing body" });
    }

    const {
      quote_id,
      quote_name,
      project_name,
      quote_data,
      total_price
    } = body;

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
