# `@mwheeler91/site-core`

Shared application behavior for the base project and client sites.

This package should contain cross-site code that is not visual UI: API helpers,
request/error handling, logging, shared data types, and framework-agnostic utility
functions. It should not contain client branding, routes, page templates, or UI
components.

## Planned contents

- `src/api/` — shared API clients and request helpers
- `src/logging/` — client error reporting
- `src/types/` — shared API/data contracts
- `src/utils/` — general reusable utilities
- `src/index.ts` — public package exports

The existing base project can be migrated into this shape incrementally. Nothing
in the existing projects needs to change until the package boundary is approved.
