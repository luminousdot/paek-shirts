"use server";

import { supabase } from "@/lib/supabase";
import { resend } from "@/lib/resend";

export type OrderData = {
  name: string;
  email: string;
  model: string;
  type: string;
  size: string;
  note: string;
};

export type OrderResult = { success: true } | { success: false; error: string };

export async function submitOrder(data: OrderData): Promise<OrderResult> {
  const { error: dbError } = await supabase.from("orders").insert([data]);

  if (dbError) {
    return { success: false, error: "Failed to save order." };
  }

  await resend.emails.send({
    from: "Paek Shirts <onboarding@resend.dev>",
    to: process.env.ORGANIZER_EMAIL!,
    subject: `Nova porudžbina: ${data.model} / ${data.type}`,
    text: `Nova porudžbina majice:\n\nIme: ${data.name}\nEmail: ${data.email}\nModel: ${data.model}\nVerzija: ${data.type}\nVeličina: ${data.size}\nNapomena: ${data.note || "-"}`,
  });

  await resend.emails.send({
    from: "Paek Shirts <onboarding@resend.dev>",
    to: data.email,
    subject: "Tvoja porudžbina je primljena!",
    text: `Zdravo ${data.name},\n\nTvoja porudžbina za majicu ${data.model} (${data.type}, veličina ${data.size}) je uspešno primljena. Javićemo ti se uskoro!\n\nNiš Climbing Club`,
  });

  return { success: true };
}
