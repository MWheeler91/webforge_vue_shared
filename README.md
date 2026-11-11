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

Canonical architecture, consumer references, and package-development guidance live in the workspace
[`_docs/projects/webforge-shared-packages/`](../../../_docs/projects/webforge-shared-packages/CONTEXT.md).
Start with its `CONTEXT.md` and follow only the relevant task route. Contributors should also read
the local [AGENTS.md](./AGENTS.md), which points to those focused guides.
