import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { ALL_SERVICES, PHARMACY } from "@/lib/pharmacy-data";

export default defineTool({
  name: "list_services",
  title: "List pharmacy services",
  description:
    "List the NHS services and private treatments offered by Kenton Pharmacy Clinic, along with opening hours and contact details.",
  inputSchema: {
    kind: z
      .enum(["all", "nhs", "private"])
      .optional()
      .describe("Filter by service type (default all)."),
  },
  annotations: {
    readOnlyHint: true,
    idempotentHint: true,
    openWorldHint: false,
  },
  handler: ({ kind }) => {
    const wanted = kind ?? "all";
    const services = ALL_SERVICES.filter(
      (s) => wanted === "all" || s.kind === wanted,
    ).map((s) => ({
      slug: s.slug,
      name: s.name,
      description: s.description,
      kind: s.kind,
    }));

    const payload = { pharmacy: PHARMACY, services };
    return {
      content: [{ type: "text", text: JSON.stringify(payload) }],
      structuredContent: payload,
    };
  },
});
