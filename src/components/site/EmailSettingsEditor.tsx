import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";
import { Loader2, Mail, Save, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getEmailSettings, updateEmailSettings } from "@/lib/email-settings.functions";
import { sendTestEmail } from "@/lib/email-test.functions";
import type { EmailSettings, AuthEmailSection, EnquiryEmailSection } from "@/lib/email-settings-schema";

type TemplateKey = keyof EmailSettings;

const GROUPS = [
  {
    id: "auth",
    label: "Account emails",
    templates: [
      { key: "signup" as TemplateKey, label: "Sign up confirmation" },
      { key: "recovery" as TemplateKey, label: "Password reset" },
      { key: "magiclink" as TemplateKey, label: "Magic link" },
      { key: "invite" as TemplateKey, label: "Staff invitation" },
      { key: "emailChange" as TemplateKey, label: "Email change" },
      { key: "reauthentication" as TemplateKey, label: "Verification code" },
    ],
  },
  {
    id: "enquiries",
    label: "Enquiry emails",
    templates: [
      { key: "newEnquiry" as TemplateKey, label: "New enquiry alert (pharmacy)" },
      { key: "enquiryConfirmation" as TemplateKey, label: "Enquiry confirmation (customer)" },
    ],
  },
];

const ALL_TEMPLATES = GROUPS.flatMap((g) => g.templates);

const TEMPLATE_VARIABLES: Record<TemplateKey, string[]> = {
  signup: ["{{siteName}}", "{{siteUrl}}", "{{recipient}}"],
  recovery: ["{{siteName}}"],
  magiclink: ["{{siteName}}"],
  invite: ["{{siteName}}", "{{siteUrl}}"],
  emailChange: ["{{siteName}}", "{{oldEmail}}", "{{newEmail}}"],
  reauthentication: ["{{siteName}}"],
  newEnquiry: ["{{fullName}}", "{{serviceName}}", "{{phone}}", "{{email}}", "{{message}}", "{{source}}", "{{submittedAt}}"],
  enquiryConfirmation: ["{{fullName}}", "{{serviceName}}", "{{phone}}"],
};

export function EmailSettingsEditor() {
  const load = useServerFn(getEmailSettings);
  const save = useServerFn(updateEmailSettings);
  const test = useServerFn(sendTestEmail);

  const [settings, setSettings] = useState<EmailSettings | null>(null);
  const [selected, setSelected] = useState<TemplateKey>("signup");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    load({})
      .then((s) => {
        setSettings(s);
      })
      .catch(() => toast.error("Couldn't load email settings"))
      .finally(() => setLoading(false));
  }, [load]);

  const updateSection = <K extends TemplateKey>(
    key: K,
    field: keyof EmailSettings[K],
    value: string,
  ) => {
    setSettings((prev) => {
      if (!prev) return prev;
      const section = { ...prev[key], [field]: value };
      return { ...prev, [key]: section } as EmailSettings;
    });
  };


  const onSave = async () => {
    if (!settings) return;
    setSaving(true);
    try {
      await save({ data: settings });
      toast.success("Email settings saved");
    } catch {
      toast.error("Couldn't save email settings");
    } finally {
      setSaving(false);
    }
  };

  const onTest = async () => {
    setTesting(true);
    try {
      const result = await test({ data: { template: selected } });
      if (result.sent) {
        toast.success("Test email sent to your inbox");
      } else {
        toast.error("This recipient is suppressed by the email provider");
      }
    } catch (error) {
      toast.error("Couldn't send test email");
    } finally {
      setTesting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center gap-2 py-12 text-muted-foreground">
        <Loader2 className="h-4 w-4 animate-spin" />
        Loading email templates…
      </div>
    );
  }

  if (!settings) {
    return <p className="py-12 text-muted-foreground">Couldn't load email settings.</p>;
  }

  const section = settings[selected];
  const isAuth = !("subheading" in section);
  const variables = TEMPLATE_VARIABLES[selected];

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <aside className="space-y-6">
        {GROUPS.map((group) => (
          <div key={group.id}>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {group.label}
            </h3>
            <nav className="space-y-1">
              {group.templates.map((t) => (
                <button
                  key={t.key}
                  onClick={() => setSelected(t.key)}
                  className={`w-full rounded-md px-3 py-2 text-left text-sm transition-colors ${
                    selected === t.key
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </nav>
          </div>
        ))}
      </aside>

      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-primary">
              {ALL_TEMPLATES.find((t) => t.key === selected)?.label}
            </h2>
            <p className="text-sm text-muted-foreground">
              Edit the wording used when this email is sent.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => void onTest()} disabled={testing}>
              {testing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
              Send test
            </Button>
            <Button onClick={() => void onSave()} disabled={saving}>
              {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              Save changes
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Mail className="h-4 w-4" />
              Subject & preview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject line</Label>
              <Input
                id="subject"
                value={section.subject}
                onChange={(e) => updateSection(selected, "subject", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                This appears in the recipient&apos;s inbox.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="preview">Preview text</Label>
              <Input
                id="preview"
                value={section.preview}
                onChange={(e) => updateSection(selected, "preview", e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Shown after the subject in some email clients.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Body content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="heading">Heading</Label>
              <Input
                id="heading"
                value={section.heading}
                onChange={(e) => updateSection(selected, "heading", e.target.value)}
              />
            </div>

            {!isAuth && (
              <div className="space-y-2">
                <Label htmlFor="subheading">Subheading</Label>
                <Input
                  id="subheading"
                  value={(section as EnquiryEmailSection).subheading ?? ""}
                  onChange={(e) => updateSection(selected, "subheading", e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="intro">Intro</Label>
              <Textarea
                id="intro"
                rows={3}
                value={section.intro ?? ""}
                onChange={(e) => updateSection(selected, "intro", e.target.value)}
              />
            </div>

            {!isAuth && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="body">Body</Label>
                  <Textarea
                    id="body"
                    rows={3}
                    value={(section as EnquiryEmailSection).body ?? ""}
                    onChange={(e) => updateSection(selected, "body", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="closing">Closing</Label>
                  <Textarea
                    id="closing"
                    rows={3}
                    value={(section as EnquiryEmailSection).closing ?? ""}
                    onChange={(e) => updateSection(selected, "closing", e.target.value)}
                  />
                </div>
              </>
            )}

            {isAuth && "buttonText" in section && (
              <div className="space-y-2">
                <Label htmlFor="buttonText">Button text</Label>
                <Input
                  id="buttonText"
                  value={(section as AuthEmailSection).buttonText ?? ""}
                  onChange={(e) => updateSection(selected, "buttonText", e.target.value)}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="footer">Footer</Label>
              <Textarea
                id="footer"
                rows={2}
                value={section.footer}
                onChange={(e) => updateSection(selected, "footer", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="rounded-md border bg-muted/40 p-4">
          <p className="text-sm font-medium">Available placeholders</p>
          <p className="text-xs text-muted-foreground">
            You can use these shortcodes in the fields above. They will be replaced with real information when the email is sent.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {variables.map((v) => (
              <code
                key={v}
                className="rounded bg-background px-2 py-1 text-xs font-medium text-primary"
              >
                {v}
              </code>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
