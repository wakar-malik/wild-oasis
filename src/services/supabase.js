import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://gfqjtaxntksyooopezgm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdmcWp0YXhudGtzeW9vb3BlemdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk4ODM3MTAsImV4cCI6MjA2NTQ1OTcxMH0.79v-bxiXCUBdJI5PdfBybkOvbcKAYlfvUlkrhw7tNxI";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
