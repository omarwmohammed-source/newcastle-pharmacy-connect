import { type ErrorComponentProps } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function PageError(_props: ErrorComponentProps) {
  return (
    <section role="alert" className="mx-auto max-w-md px-6 py-20 text-center">
      <h1 className="font-serif text-2xl font-semibold text-primary">This page didn’t load</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Please reload the page and try again. If this keeps happening, try opening the site without browser extensions.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button onClick={() => window.location.reload()}>Reload page</Button>
        <Button asChild variant="outline"><a href="/">Choose a branch</a></Button>
      </div>
    </section>
  );
}