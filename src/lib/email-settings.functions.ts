import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import {
  emailSettingsSchema,
  mergeEmailSettings,
  defaultEmailSettings,
  type EmailSettings,
} from "./email-settings-schema";

async function verifyStaff(context: {
  supabase: ReturnType<typeof import("@/integrations/supabase/client")["createClient"]>;
  userId: string;
}) {
  const { data } = await context.supabase.rpc("is_staff", {
    _user_id: context.userId,
  });
  if (data !== true) throw new Error("Access denied");
}

export const getEmailSettings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await verifyStaff(context);

    const { data, error } = await context.supabase
      .from("email_settings")
      .select("settings")
      .eq("settings_key", "default")
      .single();

    if (error || !data) {
      return defaultEmailSettings;
    }

    return mergeEmailSettings(data.settings);
  });

export const updateEmailSettings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => emailSettingsSchema.parse(input))
  .handler(async ({ data, context }) => {
    await verifyStaff(context);

    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );

    const { error } = await supabaseAdmin
      .from("email_settings")
      .upsert(
        { settings_key: "default", settings: data },
        { onConflict: "settings_key" },
      );

    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
