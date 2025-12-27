require("dotenv").config(); // Load .env variables
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("❌ Missing Supabase credentials in .env file");
  process.exit(1);
}

// Use service role key for backend operations to bypass RLS
const supabase = createClient(supabaseUrl, supabaseServiceKey);

console.log("✅ Connected to Supabase Database");

module.exports = supabase;
