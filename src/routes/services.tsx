import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/services")({
  beforeLoad: () => {
    throw redirect({
      to: "/$branch/services",
      params: { branch: "kenton" },
      statusCode: 301,
    });
  },
});
