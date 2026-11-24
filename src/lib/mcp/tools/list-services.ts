import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { ALL_SERVICES } from "@/lib/pharmacy-data";
import { BRANCHES, BRANCH_LIST, BRANCH_SLUGS, UMBRELLA_BRAND } from "@/lib/branches";

export default defineTool({
  name: "list_services",
  title: "List pharmacy services",
  description:
    "List the NHS services and private treatments offered by Newcastle Pharmacy Clinic (Kenton and Chillingham Road branches), along with each branch's opening hours and contact details.",
  inputSchema: {
    branch: z
      .enum(BRANCH_SLUGS)
      .optional()
      .describe("Filter to a specific branch (kenton or chillingham-road)."),
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
  handler: ({ branch, kind }) => {
    const wanted = kind ?? "all";
    const services = ALL_SERVICES.filter(
      (s) => wanted === "all" || s.kind === wanted,
    ).map((s) => ({
      slug: s.slug,
      name: s.name,
      description: s.description,
      kind: s.kind,
    }));

    const branches = branch ? [BRANCHES[branch]] : BRANCH_LIST;
    const payload = {
      brand: UMBRELLA_BRAND,
      pharmacy: branch ? BRANCHES[branch] : BRANCHES.kenton,
      branches,
      services,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(payload) }],
      structuredContent: payload,
    };
  },
});
