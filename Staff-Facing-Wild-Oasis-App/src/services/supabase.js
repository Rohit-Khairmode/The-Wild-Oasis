import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://jybgisqzvioijoefrffd.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5Ymdpc3F6dmlvaWpvZWZyZmZkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg4NjI2ODIsImV4cCI6MjAzNDQzODY4Mn0.8YGJwipUFL3TzVRRfmMWFY2ghzKFdfz4axGPXd54aDs";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
