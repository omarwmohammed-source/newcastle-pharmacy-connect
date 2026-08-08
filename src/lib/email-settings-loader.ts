import { mergeEmailSettings, defaultEmailSettings, type EmailSettings } from "./email-settings-schema";

let cachedSettings: EmailSettings | null = null;
let cachedAt: number | null = null;
const CACHE_MS = 60_000; // 1 minute cache for email settings to avoid DB round-trips on every send

export async function getEmailSettingsForSending(): Promise<EmailSettings> {
  const now = Date.now();
  if (cachedSettings && cachedAt && now - cachedAt < CACHE_MS) {
    return cachedSettings;
  }

  try {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("email_settings")
      .select("settings")
      .eq("settings_key", "default")
      .single();

    if (error || !data) {
      cachedSettings = defaultEmailSettings;
      cachedAt = now;
      return defaultEmailSettings;
    }

    const merged = mergeEmailSettings(data.settings);
    cachedSettings = merged;
    cachedAt = now;
    return merged;
  } catch (error) {
    console.error("[email-settings] failed to load settings, using defaults", error);
    return defaultEmailSettings;
  }
}

export function clearEmailSettingsCache(): void {
  cachedSettings = null;
  cachedAt = null;
}
