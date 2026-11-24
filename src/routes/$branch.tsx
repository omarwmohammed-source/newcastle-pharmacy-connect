import { createFileRoute, Link, notFound, Outlet } from "@tanstack/react-router";
import { BRANCH_LIST, isBranchSlug } from "@/lib/branches";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/$branch")({
  beforeLoad: ({ params }) => {
    if (!isBranchSlug(params.branch)) {
      throw notFound();
    }
  },
  component: BranchLayout,
  notFoundComponent: BranchNotFound,
});

function BranchLayout() {
  return <Outlet />;
}

function BranchNotFound() {
  return (
    <section className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="font-serif text-3xl font-semibold text-primary">
        Branch not found
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Choose one of our Newcastle Pharmacy Clinic branches below.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {BRANCH_LIST.map((branch) => (
          <Button key={branch.slug} asChild>
            <Link to="/$branch" params={{ branch: branch.slug }}>
              {branch.shortLabel}
            </Link>
          </Button>
        ))}
      </div>
    </section>
  );
}