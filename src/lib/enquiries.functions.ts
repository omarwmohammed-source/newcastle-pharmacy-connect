import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { enquiryInputSchema } from "./enquiries-schema";
import type { EnquiryRow } from "./enquiries-schema";

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => enquiryInputSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import(
      "@/integrations/supabase/client.server"
    );

    const { data: row, error } = await supabaseAdmin
      .from("enquiries")
      .insert({
        full_name: data.fullName,
        phone: data.phone,
        email: data.email || null,
        dob: data.dob || null,
        service_slug: data.serviceSlug || null,
        service_name: data.serviceName,
        message: data.message || null,
        consent: data.consent,
        source: data.source || null,
      })
      .select("id")
      .single();

    if (error) {
      console.error("[enquiries] insert failed", error);
      throw new Error("Sorry, we couldn't save your details. Please call us.");
    }

    const { notifyNewEnquiry } = await import("./enquiry-notify.server");
    await notifyNewEnquiry({ id: row.id, ...data });

    return { ok: true as const, id: row.id };
  });

export const getStaffStatus = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data } = await context.supabase.rpc("is_staff", {
      _user_id: context.userId,
    });
    return { isStaff: data === true };
  });

export const listEnquiries = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("enquiries")
      .select(
        "id, full_name, phone, email, dob, service_slug, service_name, message, consent, source, status, staff_notes, created_at",
      )
      .order("created_at", { ascending: false })
      .limit(1000);

    if (error) throw new Error(error.message);
    return (data ?? []) as EnquiryRow[];
  });

export const setEnquiryStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string; status: string }) => input)
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase
      .from("enquiries")
      .update({ status: data.status })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true as const };
  });
