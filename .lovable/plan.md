# Stabilise the admin page

## Goal
Stop `/admin` from intermittently showing a blank screen, failing during route rendering, or reporting missing backend configuration.

## Changes
1. **Align the framework packages**
   - Pin TanStack Start, React Router, router plugin, and related router packages to one compatible release family.
   - Refresh the dependency lock so the client does not load mixed router internals.
   - Preserve the existing React deduplication provided by the project build configuration.

2. **Make the backend configuration reliable**
   - Keep the browser-safe Lovable Cloud URL and publishable key available to every preview and production build.
   - Confirm no private backend credentials are exposed to browser code.
   - Remove any redundant environment-loading workaround that conflicts with the managed build configuration.

3. **Harden admin loading and errors**
   - Ensure session initialisation always leaves the loading state, including when authentication returns an error.
   - Show a useful retry state instead of an indefinite spinner or blank page.
   - Retain the current closed-signup staff login flow and dashboard permissions.

4. **Verify the real failure paths**
   - Test a fresh unauthenticated visit and hard refresh on `/admin`.
   - Confirm the staff sign-in screen renders without React dispatcher, route-match, or missing-environment errors.
   - Verify the production build contains the public backend configuration and uses only one compatible framework dependency set.

## Technical details
- The current dependency tree resolves `@tanstack/react-start` 1.168.26, `@tanstack/react-router` 1.170.16, and `@tanstack/router-core` 1.171.13. These will be aligned to prevent incompatible router code from reaching React rendering.
- Only the public project URL and publishable key may appear in the client bundle; privileged keys remain server-only.