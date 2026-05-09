import { supabaseAdmin } from "../src/lib/supabase-admin";

async function test() {
  const { data, error } = await supabaseAdmin
    .from("shortlinks")
    .select("*")
    .limit(1);
  
  if (error) {
    console.error("❌ Supabase Error:", error);
  } else {
    console.log("✅ Supabase Success:", data);
  }
}

test();
