# `@mwheeler91/ui`

Reusable Vue components, styles, theme tokens, and UI configuration.

This package should contain code that can be shared by the base project and every
client site. It should not contain site branding, API calls, routes, templates, or
client-specific content.

## Contents

- `src/components/` — reusable Vue components and patterns
- `src/config/` — UI configuration, defaults, and runtime theme resolution
- `src/styles/` — tokens, foundations, component styles, and UI packs
- `src/utils/` — UI-only helpers
- `src/index.ts` — public package exports

Consuming applications integrate this package explicitly through its public exports, stylesheet, runtime
configuration calls, and Theme/font/typography application paths.

## Component-development boundary

Read [`docs/ui/architecture.md`](../../docs/ui/architecture.md),
[`docs/ui/component-development.md`](../../docs/ui/component-development.md), and, for cards,
[`docs/ui/cards.md`](../../docs/ui/cards.md) before adding a component. A normal pattern owns its Vue contract and
scoped structural/layout CSS. It does not own UI-pack treatment, Theme colors, typography/font systems,
radius/density/motion systems, global configuration, or shared family-root CSS.

For cards, `src/styles/components/base-card.css` is limited to the shared `BaseCard`/`CardLink` surface contract;
individual card-pattern layouts stay with their patterns. Validate shared changes from `shared/` with
`npm run type-check`, `npm test`, and `npm run build`, plus playground visual validation for card/component work.
