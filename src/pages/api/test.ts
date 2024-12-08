import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { data, error } = await supabase.from("profiles").select("*");
    if (error) {
      console.error("Errore Supabase:", error);
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error("Errore Generale:", err);
    res.status(500).json({ error: "Errore interno del server." });
  }
}
