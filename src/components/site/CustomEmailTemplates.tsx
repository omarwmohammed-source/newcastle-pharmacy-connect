import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2, Plus, Save, Send, Trash2, Palette, Tags } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  listCustomTemplates,
  saveCustomTemplate,
  deleteCustomTemplate,
  sendCustomTemplateTest,
} from "@/lib/custom-emails.functions";
import {
  blankTemplate,
  defaultDesign,
  renderCustomEmailHtml,
  sampleVariables,
  type CustomEmailTemplate,
} from "@/lib/custom-email-schema";

type Draft = CustomEmailTemplate & { id?: string };

const COLOUR_FIELDS: { key: keyof typeof defaultDesign; label: string }[] = [
  { key: "accentColor", label: "Heading colour" },
  { key: "buttonColor", label: "Button colour" },
  { key: "buttonTextColor", label: "Button text" },
  { key: "backgroundColor", label: "Page background" },
  { key: "cardColor", label: "Card background" },
  { key: "textColor", label: "Body text" },
];

const FONTS = [
  { value: "Georgia, 'EB Garamond', serif", label: "Garamond / serif (brand)" },
  { value: "Arial, Helvetica, sans-serif", label: "Arial / sans-serif" },
  { value: "'Trebuchet MS', Verdana, sans-serif", label: "Trebuchet" },
  { value: "'Courier New', monospace", label: "Courier" },
];

export function CustomEmailTemplates() {
  const load = useServerFn(listCustomTemplates);
  const save = useServerFn(saveCustomTemplate);
  const remove = useServerFn(deleteCustomTemplate);
  const test = useServerFn(sendCustomTemplateTest);

  const [templates, setTemplates] = useState<Draft[]>([]);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [testTo, setTestTo] = useState("");

  useEffect(() => {
    load({})
      .then((rows) => setTemplates(rows as Draft[]))
      .catch(() => toast.error("Couldn't load your templates"))
      .finally(() => setLoading(false));
  }, [load]);

  const previewHtml = useMemo(
    () => (draft ? renderCustomEmailHtml(draft, sampleVariables(draft)) : ""),
    [draft],
  );

  const set = <K extends keyof Draft>(field: K, value: Draft[K]) =>
    setDraft((prev) => (prev ? { ...prev, [field]: value } : prev));

  const setDesign = (field: keyof typeof defaultDesign, value: string | number | boolean) =>
    setDraft((prev) =>
      prev ? { ...prev, design: { ...prev.design, [field]: value } } : prev,
    );

  const onSave = async () => {
    if (!draft) return;
    setSaving(true);
    try {
      const saved = (await save({ data: draft })) as Draft;
      setTemplates((prev) => {
        const exists = prev.some((t) => t.id === saved.id);
        return exists ? prev.map((t) => (t.id === saved.id ? saved : t)) : [...prev, saved];
      });
      setDraft(saved);
      toast.success("Template saved");
    } catch {
      toast.error("Couldn't save. Check the name and subject are filled in.");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async () => {
    if (!draft?.id) {
      setDraft(null);
      return;
    }
    try {
      await remove({ data: { id: draft.id } });
      setTemplates((prev) => prev.filter((t) => t.id !== draft.id));
      setDraft(null);
      toast.success("Template deleted");
    } catch {
      toast.error("Couldn't delete template");
    }
  };

  const onTest = async () => {
    if (!draft) return;
    setTesting(true);
    try {
      const result = (await test({
        data: { template: draft, to: testTo.trim() || undefined },
      })) as { sent: boolean; recipient?: string };
      toast[result.sent ? "success" : "error"](
        result.sent
          ? `Test email sent to ${result.recipient ?? "your inbox"}`
          : "This recipient is blocked by the email provider",
      );
    } catch (error) {
      toast.error(
        error instanceof Error && error.message
          ? error.message
          : "Couldn't send test email",
      );
    } finally {
      setTesting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 py-12 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading your templates…
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <aside className="space-y-3">
        <Button
          className="w-full"
          onClick={() => setDraft({ ...blankTemplate, design: { ...defaultDesign } })}
        >
          <Plus className="mr-2 h-4 w-4" />
          Create new template
        </Button>
        <nav className="space-y-1">
          {templates.length === 0 && (
            <p className="px-1 text-xs text-muted-foreground">
              No custom templates yet. Create one to get started.
            </p>
          )}
          {templates.map((t) => (
            <button
              key={t.id}
              onClick={() => setDraft(t)}
              className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                draft?.id === t.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
              }`}
            >
              {t.name}
            </button>
          ))}
        </nav>
      </aside>

      {!draft ? (
        <div className="rounded-lg border bg-muted/40 p-8 text-sm text-muted-foreground">
          Pick a template on the left, or click <strong>Create new template</strong> to build
          one from scratch. You can change the wording, colours, logo and add your own
          placeholders, then send yourself a test copy.
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-[220px] flex-1">
              <Label htmlFor="tpl-name">Template name</Label>
              <Input
                id="tpl-name"
                className="mt-1"
                value={draft.name}
                onChange={(e) => set("name", e.target.value)}
              />
            </div>
            <div className="min-w-[220px]">
              <Label htmlFor="tpl-test-to">Send test to</Label>
              <Input
                id="tpl-test-to"
                type="email"
                className="mt-1"
                placeholder="you@example.com"
                value={testTo}
                onChange={(e) => setTestTo(e.target.value)}
              />
            </div>
            <div className="flex gap-2 pt-5">
              <Button variant="outline" onClick={() => void onTest()} disabled={testing}>
                {testing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                Send test
              </Button>
              <Button onClick={() => void onSave()} disabled={saving}>
                {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                Save
              </Button>
              <Button variant="ghost" onClick={() => void onDelete()}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-4 xl:grid-cols-2">
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Field label="Subject line" value={draft.subject} onChange={(v) => set("subject", v)} />
                  <Field label="Preview text" value={draft.preview} onChange={(v) => set("preview", v)} />
                  <Field label="Heading" value={draft.heading} onChange={(v) => set("heading", v)} />
                  <Field label="Subheading" value={draft.subheading} onChange={(v) => set("subheading", v)} />
                  <AreaField label="Intro" value={draft.intro} onChange={(v) => set("intro", v)} />
                  <AreaField label="Main body" value={draft.body} onChange={(v) => set("body", v)} rows={5} />
                  <AreaField label="Closing" value={draft.closing} onChange={(v) => set("closing", v)} />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Button text" value={draft.buttonText} onChange={(v) => set("buttonText", v)} />
                    <Field label="Button link" value={draft.buttonUrl} onChange={(v) => set("buttonUrl", v)} />
                  </div>
                  <AreaField label="Footer" value={draft.footer} onChange={(v) => set("footer", v)} rows={2} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Palette className="h-4 w-4" />
                    Design & graphics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-3 sm:grid-cols-2">
                    {COLOUR_FIELDS.map((f) => (
                      <div key={f.key} className="space-y-1.5">
                        <Label className="text-xs">{f.label}</Label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            className="h-9 w-10 cursor-pointer rounded border bg-background"
                            value={String(draft.design[f.key] ?? "#000000")}
                            onChange={(e) => setDesign(f.key, e.target.value)}
                          />
                          <Input
                            value={String(draft.design[f.key] ?? "")}
                            onChange={(e) => setDesign(f.key, e.target.value)}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs">Font</Label>
                    <select
                      className="h-9 w-full rounded-md border bg-background px-3 text-sm"
                      value={draft.design.fontFamily}
                      onChange={(e) => setDesign("fontFamily", e.target.value)}
                    >
                      {FONTS.map((f) => (
                        <option key={f.value} value={f.value}>
                          {f.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Field
                    label="Logo image URL"
                    value={draft.design.logoUrl}
                    onChange={(v) => setDesign("logoUrl", v)}
                    hint="Paste a link to your logo image. Leave blank for no logo."
                  />
                  <Field
                    label="Banner image URL"
                    value={draft.design.imageUrl}
                    onChange={(v) => setDesign("imageUrl", v)}
                    hint="Optional wide picture shown under the logo."
                  />

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label className="text-xs">Logo width (px)</Label>
                      <Input
                        type="number"
                        min={40}
                        max={400}
                        value={draft.design.logoWidth}
                        onChange={(e) => setDesign("logoWidth", Number(e.target.value) || 140)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Corner roundness</Label>
                      <Input
                        type="number"
                        min={0}
                        max={32}
                        value={draft.design.cornerRadius}
                        onChange={(e) => setDesign("cornerRadius", Number(e.target.value) || 0)}
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6">
                    <label className="flex items-center gap-2 text-sm">
                      <Switch
                        checked={draft.design.align === "center"}
                        onCheckedChange={(c) => setDesign("align", c ? "center" : "left")}
                      />
                      Centre the text
                    </label>
                    <label className="flex items-center gap-2 text-sm">
                      <Switch
                        checked={draft.design.showDivider}
                        onCheckedChange={(c) => setDesign("showDivider", c)}
                      />
                      Line above footer
                    </label>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Tags className="h-4 w-4" />
                    Placeholders
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-xs text-muted-foreground">
                    Add a placeholder, then type it into any field above (for example{" "}
                    <code className="rounded bg-muted px-1">{"{{firstName}}"}</code>). The example
                    value is what appears in the preview and test email.
                  </p>
                  {draft.placeholders.map((p, i) => (
                    <div key={i} className="grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
                      <Input
                        placeholder="name"
                        value={p.key}
                        onChange={(e) => {
                          const next = [...draft.placeholders];
                          next[i] = { ...p, key: e.target.value.replace(/[^a-zA-Z0-9_]/g, "") };
                          set("placeholders", next);
                        }}
                      />
                      <Input
                        placeholder="Example value"
                        value={p.sample}
                        onChange={(e) => {
                          const next = [...draft.placeholders];
                          next[i] = { ...p, sample: e.target.value };
                          set("placeholders", next);
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          set(
                            "placeholders",
                            draft.placeholders.filter((_, idx) => idx !== i),
                          )
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      set("placeholders", [
                        ...draft.placeholders,
                        { key: "", label: "", sample: "" },
                      ])
                    }
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add placeholder
                  </Button>
                  {draft.placeholders.filter((p) => p.key).length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {draft.placeholders
                        .filter((p) => p.key)
                        .map((p) => (
                          <code
                            key={p.key}
                            className="rounded bg-muted px-2 py-1 text-xs font-medium text-primary"
                          >{`{{${p.key}}}`}</code>
                        ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="xl:sticky xl:top-6 xl:self-start">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Live preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <iframe
                    title="Email preview"
                    srcDoc={previewHtml}
                    className="h-[640px] w-full rounded-md border bg-white"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  hint,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">{label}</Label>
      <Input value={value} onChange={(e) => onChange(e.target.value)} />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function AreaField({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs">{label}</Label>
      <Textarea rows={rows} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
