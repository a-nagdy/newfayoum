const { createClient } = require("@supabase/supabase-js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_API_KEY,
);

supabase
  .from("content_sections")
  .select("key")
  .limit(1)
  .then(({ data, error }) => {
    if (error) console.error("Supabase connection error:", error.message);
    else console.log("Supabase connected. Sections:", data?.length ?? 0);
  });

module.exports = supabase;
