import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { z } from "zod";
import { customEmailTemplateSchema } from "./custom-email-schema";

export const listCustomTemplates = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { requireStaff, rowToTemplate } = await import("./custom-emails.server");
    await requireStaff(context as any);

    const { data, error } = await context.supabase
      .from("custom_email_templates")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) throw new Error(error.message);
    return (data ?? []).map((row) => rowToTemplate(row as Record<string, any>));
  });

export const saveCustomTemplate = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => customEmailTemplateSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { requireStaff, templateToRow, rowToTemplate } = await import(
      "./custom-emails.server"
    );
    await requireStaff(context as any);

    const row = templateToRow(data);

    if (data.id) {
      const { data: updated, error } = await context.supabase
        .from("custom_email_templates")
        .update(row)
        .eq("id", data.id)
        .select("*")
        .single();
      if (error) throw new Error(error.message);
      return rowToTemplate(updated as Record<string, any>);
    }

    const { data: inserted, error } = await context.supabase
      .from("custom_email_templates")
      .insert({ ...row, created_by: context.userId })
      .select("*")
      .single();
    if (error) throw new Error(error.message);
    return rowToTemplate(inserted as Record<string, any>);
  });

export const deleteCustomTemplate = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { requireStaff } = await import("./custom-emails.server");
    await requireStaff(context as any);

    const { error } = await context.supabase
      .from("custom_email_templates")
      .delete()
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });

export const sendCustomTemplateTest = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => customEmailTemplateSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { requireStaff, sendCustomEmail } = await import("./custom-emails.server");
    const { sampleVariables } = await import("./custom-email-schema");
    await requireStaff(context as any);

    const email = (context.claims as { email?: string })?.email;
    if (!email) throw new Error("No email found for your account");

    const result = await sendCustomEmail(
      email,
      { ...data, subject: `[TEST] ${data.subject}` },
      sampleVariables(data),
      "test",
    );
    return result;
  });
