import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { supabaseForUser } from "../supabase";

export default defineTool({
  name: "update_enquiry",
  title: "Update an enquiry",
  description:
    "Update the status and/or staff notes of a patient enquiry. Staff access only.",
  inputSchema: {
    id: z.string().uuid().describe("The enquiry id."),
    status: z
      .enum(["new", "in_progress", "done"])
      .optional()
      .describe("New status for the enquiry."),
    staff_notes: z
      .string()
      .max(2000)
      .optional()
      .describe("Internal staff notes to store against the enquiry."),
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    openWorldHint: false,
  },
  handler: async ({ id, status, staff_notes }, ctx) => {
    if (!ctx.isAuthenticated()) {
      return {
        content: [{ type: "text", text: "Not authenticated" }],
        isError: true,
      };
    }
    if (status === undefined && staff_notes === undefined) {
      return {
        content: [
          {
            type: "text",
            text: "Provide status and/or staff_notes to update.",
          },
        ],
        isError: true,
      };
    }
    const patch: Record<string, unknown> = {};
    if (status !== undefined) patch.status = status;
    if (staff_notes !== undefined) patch.staff_notes = staff_notes;

    const supabase = supabaseForUser(ctx);
    const { data, error } = await supabase
      .from("enquiries")
      .update(patch)
      .eq("id", id)
      .select("id, status, staff_notes")
      .maybeSingle();

    if (error) {
      return { content: [{ type: "text", text: error.message }], isError: true };
    }
    if (!data) {
      return {
        content: [{ type: "text", text: "No enquiry found with that id." }],
        isError: true,
      };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(data) }],
      structuredContent: { enquiry: data },
    };
  },
});
