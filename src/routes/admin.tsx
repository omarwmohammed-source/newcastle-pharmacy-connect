import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { LogOut, RefreshCw, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  listEnquiries,
  setEnquiryStatus,
  getStaffStatus,
  claimStaffAccess,
} from "@/lib/enquiries.functions";

import type { EnquiryRow } from "@/lib/enquiries-schema";
import { ENQUIRY_STATUSES } from "@/lib/enquiries-schema";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Staff enquiries — Kenton Pharmacy Clinic" },
      {
        name: "description",
        content:
          "Secure staff area for viewing patient enquiries submitted through the Kenton Pharmacy Clinic website.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

const STATUS_LABEL: Record<string, string> = {
  new: "New",
  in_progress: "In progress",
  done: "Done",
};

function AdminPage() {
  const [session, setSession] = useState<unknown>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!ready) {
    return (
      <section className="mx-auto max-w-md px-6 py-24 text-center text-muted-foreground">
        Loading…
      </section>
    );
  }

  return session ? <Dashboard /> : <SignIn />;
}

function SignIn() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      setPending(false);
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success(
        "Account created. Check your inbox for a confirmation email, then sign in.",
      );
      setMode("signin");
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    setPending(false);
    if (error) toast.error(error.message);
  };

  return (
    <section className="mx-auto max-w-md px-6 py-20">
      <div className="rounded-xl border bg-card p-8 shadow-sm">
        <ShieldCheck className="h-8 w-8 text-primary" />
        <h1 className="mt-4 text-2xl font-bold text-primary">
          {mode === "signin" ? "Staff sign in" : "Create staff account"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          This area contains patient enquiries. Authorised staff only.
        </p>
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <Label htmlFor="email" className="mb-1.5 block text-sm">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password" className="mb-1.5 block text-sm">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              autoComplete={
                mode === "signin" ? "current-password" : "new-password"
              }
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>
          <Button type="submit" className="w-full" disabled={pending}>
            {pending
              ? "Please wait…"
              : mode === "signin"
                ? "Sign in"
                : "Create account"}
          </Button>
        </form>
        <button
          type="button"
          className="mt-4 text-sm text-primary underline underline-offset-2"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
        >
          {mode === "signin"
            ? "First time here? Create your staff account"
            : "Already have an account? Sign in"}
        </button>
      </div>
    </section>
  );
}


function Dashboard() {
  const load = useServerFn(listEnquiries);
  const checkStaff = useServerFn(getStaffStatus);
  const claim = useServerFn(claimStaffAccess);
  const updateStatus = useServerFn(setEnquiryStatus);

  const [rows, setRows] = useState<EnquiryRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [denied, setDenied] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      let staff = await checkStaff({});
      if (!staff.isStaff) {
        // The pharmacy's own business address can grant itself access on
        // first sign-in so the owner is never locked out.
        const claimed = await claim({});
        if (claimed.granted) staff = await checkStaff({});
      }
      if (!staff.isStaff) {
        setDenied(true);
        setRows([]);
        return;
      }
      setDenied(false);
      setRows(await load({}));
    } catch {
      toast.error("Couldn't load enquiries");
    } finally {
      setLoading(false);
    }
  }, [checkStaff, claim, load]);


  useEffect(() => {
    void refresh();
  }, [refresh]);

  const onStatus = async (id: string, status: string) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    try {
      await updateStatus({ data: { id, status } });
    } catch {
      toast.error("Couldn't update status");
      void refresh();
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-12">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">
            Patient enquiries
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Submitted through the website. Handle in line with the practice
            privacy notice.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => void refresh()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => void supabase.auth.signOut()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </header>

      {denied ? (
        <p className="mt-12 rounded-lg border bg-muted/40 p-6 text-sm text-muted-foreground">
          Your account is signed in but has not been given staff access yet. Ask
          an administrator to add the staff role to your account.
        </p>
      ) : loading ? (
        <p className="mt-12 text-muted-foreground">Loading enquiries…</p>
      ) : rows.length === 0 ? (
        <p className="mt-12 text-muted-foreground">No enquiries yet.</p>
      ) : (
        <div className="mt-8 space-y-4">
          {rows.map((r) => (
            <article key={r.id} className="rounded-xl border bg-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-primary">
                    {r.full_name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {r.service_name}
                    {r.source ? ` · ${r.source}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">
                    {new Date(r.created_at).toLocaleString("en-GB")}
                  </Badge>
                  <Select
                    value={r.status}
                    onValueChange={(v) => void onStatus(r.id, v)}
                  >
                    <SelectTrigger className="h-8 w-[150px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ENQUIRY_STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {STATUS_LABEL[s] ?? s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-3">
                <Detail label="Phone" value={r.phone} />
                <Detail label="Email" value={r.email} />
                <Detail label="Date of birth" value={r.dob} />
              </dl>
              {r.message && (
                <p className="mt-4 rounded-md bg-muted/50 p-3 text-sm">
                  {r.message}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="font-medium">{value || "—"}</dd>
    </div>
  );
}
