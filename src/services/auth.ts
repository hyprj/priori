import { createClient } from "@supabase/supabase-js";
import { Database } from "src/types/supabase";

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const login = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "https://hyprj-priori.netlify.app/",
    },
  });

  if (error) {
    throw new Error(error.message);
  }
  return data;
};
