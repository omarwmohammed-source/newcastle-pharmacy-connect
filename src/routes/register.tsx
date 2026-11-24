import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/register")({
  validateSearch: (search: Record<string, unknown>): { service?: string } => {
    const raw = search["service"];
    return typeof raw === "string" && raw.trim() ? { service: raw.trim() } : {};
  },
  beforeLoad: ({ search }) => {
    throw redirect({
      to: "/$branch/register",
      params: { branch: "kenton" },
      search,
      statusCode: 301,
    });
  },
});
