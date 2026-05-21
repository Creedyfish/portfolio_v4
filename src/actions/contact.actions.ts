"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(form: {
  name: string;
  email: string;
  message: string;
}) {
  const { name, email, message } = form;

  if (!name || !email || !message) {
    return { ok: false, error: "Missing fields" };
  }

  const { error } = await resend.emails.send({
    from: process.env.DOMAIN_EMAIL ?? "onboarding@resend.dev",
    to: process.env.CONTACT_EMAIL!,
    replyTo: email,
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  });

  if (error) {
    console.error("Resend error:", error);
    return { ok: false, error: "Failed to send" };
  }

  return { ok: true };
}
