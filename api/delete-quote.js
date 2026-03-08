import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { quote_id, member_key } = req.body || {};

    if (!quote_id) {
      return res.status(400).json({ error: "quote_id is required" });
    }

    if (!member_key) {
      return res.status(400).json({ error: "member_key is required" });
    }

    const { data, error } = await supabase
      .from("Fab Quoting Pro")
      .delete()
      .eq("id", quote_id)
      .eq("member_key", member_key)
      .select();

    if (error) {
      console.error(error);
      return res.status(500).json({
        error: "Database error",
        details: error.message
      });
    }

    return res.status(200).json({
      ok: true,
      deleted_count: Array.isArray(data) ? data.length : 0
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Server error",
      details: String(error)
    });
  }
}
