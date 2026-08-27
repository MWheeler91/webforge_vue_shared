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

The applications are not wired to these packages yet. That migration should happen
after the package-local aliases are cleaned up and the first package build is green.
