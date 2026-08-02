import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type OAuthApi = {
  getAuthorizationDetails: (id: string) => Promise<{
    data: {
      client?: { name?: string } | null;
      redirect_url?: string;
      redirect_to?: string;
    } | null;
    error: { message: string } | null;
  }>;
  approveAuthorization: (id: string) => Promise<{
    data: { redirect_url?: string; redirect_to?: string } | null;
    error: { message: string } | null;
  }>;
  denyAuthorization: (id: string) => Promise<{
    data: { redirect_url?: string; redirect_to?: string } | null;
    error: { message: string } | null;
  }>;
};

function oauthApi(): OAuthApi {
  return (supabase.auth as unknown as { oauth: OAuthApi }).oauth;
}

export const Route = createFileRoute("/.lovable/oauth/consent")({
  ssr: false,
  validateSearch: (s: Record<string, unknown>) => ({
    authorization_id:
      typeof s.authorization_id === "string" ? s.authorization_id : "",
  }),
  head: () => ({
    meta: [
      { title: "Connect an app — Kenton Pharmacy Clinic" },
      {
        name: "description",
        content:
          "Approve or deny an AI assistant's request to connect to Kenton Pharmacy Clinic.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: Consent,
});

function Consent() {
  const { authorization_id } = Route.useSearch();
  const [session, setSession] = useState<unknown>(undefined);
  const [details, setDetails] = useState<{
    client?: { name?: string } | null;
  } | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Load session + authorization details once on mount (client-only route).
  if (session === undefined) {
    void (async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session ?? null);
      if (data.session && authorization_id) {
        const { data: d, error: e } =
          await oauthApi().getAuthorizationDetails(authorization_id);
        if (e) setError(e.message);
        const immediate = d?.redirect_url ?? d?.redirect_to;
        if (immediate && !d?.client) {
          window.location.href = immediate;
          return;
        }
        setDetails(d ?? null);
      }
    })();
  }

  async function signIn(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error: err } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setBusy(false);
    if (err) {
      setError(err.message);
      return;
    }
    setSession(undefined);
  }

  async function decide(approve: boolean) {
    setBusy(true);
    setError(null);
    const api = oauthApi();
    const { data, error: err } = approve
      ? await api.approveAuthorization(authorization_id)
      : await api.denyAuthorization(authorization_id);
    if (err) {
      setBusy(false);
      setError(err.message);
      return;
    }
    const target = data?.redirect_url ?? data?.redirect_to;
    if (!target) {
      setBusy(false);
      setError("No redirect returned by the authorization server.");
      return;
    }
    window.location.href = target;
  }

  if (!authorization_id) {
    return (
      <main className="mx-auto max-w-md px-6 py-20 text-muted-foreground">
        Missing authorization request.
      </main>
    );
  }

  if (session === undefined) {
    return (
      <main className="mx-auto max-w-md px-6 py-24 text-center text-muted-foreground">
        Loading…
      </main>
    );
  }

  if (!session) {
    return (
      <main className="mx-auto max-w-md px-6 py-20">
        <div className="rounded-xl border bg-card p-8 shadow-sm">
          <ShieldCheck className="h-8 w-8 text-primary" />
          <h1 className="mt-4 text-2xl font-bold text-primary">
            Sign in to continue
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in with your Kenton Pharmacy Clinic staff account to connect
            this app.
          </p>
          {error && (
            <p role="alert" className="mt-4 text-sm text-destructive">
              {error}
            </p>
          )}
          <form onSubmit={signIn} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="c-email" className="mb-1.5 block text-sm">
                Email
              </Label>
              <Input
                id="c-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="c-password" className="mb-1.5 block text-sm">
                Password
              </Label>
              <Input
                id="c-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={busy}>
              {busy ? "Please wait…" : "Sign in"}
            </Button>
          </form>
        </div>
      </main>
    );
  }

  const clientName = details?.client?.name ?? "an app";

  return (
    <main className="mx-auto max-w-md px-6 py-20">
      <div className="rounded-xl border bg-card p-8 shadow-sm">
        <ShieldCheck className="h-8 w-8 text-primary" />
        <h1 className="mt-4 text-2xl font-bold text-primary">
          Connect {clientName} to your account
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This lets {clientName} read and manage Kenton Pharmacy Clinic patient
          enquiries as you. Only approve apps you trust.
        </p>
        {error && (
          <p role="alert" className="mt-4 text-sm text-destructive">
            {error}
          </p>
        )}
        <div className="mt-6 flex gap-3">
          <Button
            className="flex-1"
            disabled={busy}
            onClick={() => decide(true)}
          >
            Approve
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            disabled={busy}
            onClick={() => decide(false)}
          >
            Deny
          </Button>
        </div>
      </div>
    </main>
  );
}
