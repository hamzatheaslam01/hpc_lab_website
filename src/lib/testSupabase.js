import { supabase } from "./supabase";

export async function testSupabase() {
  const { data, error } = await supabase
    .from("categories")
    .select("*");

  console.log("Supabase data:", data);
  console.log("Supabase error:", error);
}