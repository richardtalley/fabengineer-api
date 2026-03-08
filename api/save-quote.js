import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

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
      member_key,
      quote_name,
      project_name,
      quote_data,
      total_price
    } = req.body || {};

    if (!member_key) {
      return res.status(400).json({ error: "member_key is required" });
    }

    if (!quote_name) {
      return res.status(400).json({ error: "quote_name is required" });
    }

    const rowPayload = {
      member_key,
      quote_name,
      project_name: project_name || "",
      quote_data: quote_data || {},
      total_price: Number(total_price || 0),
      updated_at: new Date().toISOString()
    };

    let result;

    if (quote_id) {
      result = await supabase
        .from("Fab Quoting Pro")
        .update(rowPayload)
        .eq("id", quote_id)
        .eq("member_key", member_key)
        .select()
        .single();
    } else {
      result = await supabase
        .from("Fab Quoting Pro")
        .insert([rowPayload])
        .select()
        .single();
    }

    if (result.error) {
      console.error(result.error);
      return res.status(500).json({
        error: "Database error",
        details: result.error.message
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Quote saved",
      quote_id: result.data.id
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Server error",
      details: String(error)
    });
  }
}
