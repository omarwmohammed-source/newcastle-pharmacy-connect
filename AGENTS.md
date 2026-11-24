<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture
- Multi-branch config lives in `src/lib/branches.ts` (`BRANCHES`, `BRANCH_LIST`, `UMBRELLA_BRAND`) so branch metadata, routes (`src/routes/$branch*.tsx`), enquiries, emails, and MCP tools share one source of truth.
- Legacy top-level Kenton paths (`/services`, `/private`, `/contact`, `/register`) issue 301 redirects to `/kenton/*` so published links and search results stay valid.
