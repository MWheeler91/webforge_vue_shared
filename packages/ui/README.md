# `@mwheeler/ui`

Reusable Vue components, styles, theme tokens, and UI configuration.

This package should contain code that can be shared by the base project and every
client site. It should not contain site branding, API calls, routes, templates, or
client-specific content.

## Planned contents

- `src/components/` — reusable Vue components and patterns
- `src/config/` — UI configuration, defaults, and runtime theme resolution
- `src/styles/` — tokens, foundations, component styles, and UI packs
- `src/utils/` — UI-only helpers
- `src/index.ts` — public package exports

The existing base project can be migrated into this shape incrementally. Nothing
in the existing projects needs to change until the package boundary is approved.
