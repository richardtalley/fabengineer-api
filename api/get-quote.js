import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { id, member_key } = req.query || {};

    if (!id) {
      return res.status(400).json({ error: "id is required" });
    }

    if (!member_key) {
      return res.status(400).json({ error: "member_key is required" });
    }

    const { data, error } = await supabase
      .from("Fab Quoting Pro")
      .select("*")
      .eq("id", id)
      .eq("member_key", member_key)
      .single();

    if (error) {
      console.error(error);
      return res.status(500).json({
        error: "Database error",
        details: error.message
      });
    }

    if (!data) {
      return res.status(404).json({ error: "Quote not found" });
    }

    return res.status(200).json({
      ok: true,
      quote: data
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Server error",
      details: String(error)
    });
  }
}
