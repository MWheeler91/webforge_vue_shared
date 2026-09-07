# MWheeler Shared Packages

Shared packages used by the base website project and client sites.

## Packages

- [`@mwheeler/ui`](./packages/ui) — Vue components, styles, theme configuration, and UI helpers.
- [`@mwheeler/site-core`](./packages/site-core) — shared API clients, types, logging, and general utilities.

The packages live in one repository so changes can be reviewed and tested together,
while each package keeps its own version and public entry point.

## Local setup

```sh
npm install
npm run type-check
npm test
npm run build
```

The root playground is wired as a consuming application through the published package names and stylesheet
entrypoint. Other client applications may migrate independently; package integration is explicit and does not
imply automatic bootstrap/configuration behavior.

## Architecture documentation

Start with [the shared-package overview](./docs/shared-package-overview.md). Focused guides are
available for [site-core](./docs/site-core.md) and the [UI architecture](./docs/ui/architecture.md),
[components](./docs/ui/components.md), [card pattern development](./docs/ui/cards.md),
[Django section/card payload example](./docs/ui/example_api_payload.md),
[styling](./docs/ui/styling-system.md), [configuration](./docs/ui/configuration.md), and
[UI packs](./docs/ui/ui-packs.md). Contributors should also read [AGENTS.md](./AGENTS.md).
