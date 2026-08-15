import { profile } from "@/data/portfolio";

function readEnv(key: string): string {
  const value = import.meta.env[key];
  return typeof value === "string" ? value.trim() : "";
}

export const emailjsConfig = {
  publicKey: readEnv("VITE_EMAILJS_PUBLIC_KEY"),
  serviceId: readEnv("VITE_EMAILJS_SERVICE_ID"),
  templateId: readEnv("VITE_EMAILJS_TEMPLATE_ID"),
} as const;

export function isEmailJsConfigured() {
  return Boolean(
    emailjsConfig.publicKey && emailjsConfig.serviceId && emailjsConfig.templateId,
  );
}

export async function sendContactEmail(params: {
  name: string;
  email: string;
  message: string;
}) {
  if (!isEmailJsConfigured()) {
    throw new Error("EmailJS is not configured");
  }

  const emailjs = (await import("@emailjs/browser")).default;
  emailjs.init(emailjsConfig.publicKey);

  return emailjs.send(emailjsConfig.serviceId, emailjsConfig.templateId, {
    from_name: params.name,
    name: params.name,
    email: params.email,
    message: params.message,
    to_email: profile.email,
    subject: `New message from ${params.name}`,
  });
}
