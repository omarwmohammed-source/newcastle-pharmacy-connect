import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { BRANCH_SLUGS } from "@/lib/branches";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "list_enquiries",
  title: "List patient enquiries",
  description:
    "List register-interest enquiries submitted through the Newcastle Pharmacy Clinic website across both Kenton and Chillingham Road branches, newest first. Staff access only.",
  inputSchema: {
    branch: z
      .enum(BRANCH_SLUGS)
      .optional()
      .describe("Filter by branch slug (kenton or chillingham-road)."),
    status: z
      .enum(["new", "in_progress", "done"])
      .optional()
      .describe("Filter by enquiry status."),
    limit: z
      .number()
      .int()
      .min(1)
      .max(100)
      .optional()
      .describe("Maximum number of enquiries to return (default 25)."),
  },
  annotations: {
    readOnlyHint: true,
    idempotentHint: true,
    openWorldHint: false,
  },
  handler: async ({ branch, status, limit }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return {
        content: [{ type: "text", text: "Not authenticated" }],
        isError: true,
      };
    }
    const supabase = supabaseForUser(ctx);
    let query = supabase
      .from("enquiries")
      .select(
        "id, branch, full_name, phone, email, dob, service_name, service_slug, message, status, staff_notes, created_at",
      )
      .order("created_at", { ascending: false })
      .limit(limit ?? 25);
    if (branch) query = query.eq("branch", branch);
    if (status) query = query.eq("status", status);

    const { data, error } = await query;
    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data ?? []) }],
      structuredContent: { enquiries: data ?? [] },
    };
  },
});
