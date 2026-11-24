import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/private")({
  beforeLoad: () => {
    throw redirect({
      to: "/$branch/private",
      params: { branch: "kenton" },
      statusCode: 301,
    });
  },
});
