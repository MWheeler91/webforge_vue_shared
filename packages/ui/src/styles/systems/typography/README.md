# Typography Presets

Typography presets define the global metrics for reusable type roles. They are selected through
`data-ui-typography` and live in [index.css](./index.css). A preset changes scale, line height,
weight, letter spacing, and reading rhythm; it does not choose font families, colors, component
selectors, or semantic heading tags.

## Current presets

| Key | Description |
| --- | --- |
| `default` | Balanced sans-serif-friendly baseline for general sites. |
| `compact` | Tighter, denser hierarchy for information-heavy interfaces. |
| `classic` | More relaxed, traditional reading rhythm. |
| `modern` | Large, high-contrast contemporary hierarchy. |
| `display` | Expressive, display-led hierarchy for marketing emphasis. |
| `editorial` | Measured hierarchy and generous rhythm for narrative content. |
| `luxury` | Refined display emphasis with spacious supporting copy. |
| `playful` | Friendly, rounded-feeling hierarchy with open rhythm. |
| `technical` | Dense, utilitarian hierarchy suitable for technical contexts. |

Font choice is independent and is configured with `data-ui-font`. UI packs may map component
contexts onto these roles, but they must not change role metrics.

## Create a new preset

1. Choose a lowercase kebab-case preset key and add it to `UiTypography` in
   `config/ui.types.ts`.
2. Copy the complete `[data-ui-typography='default']` block in [index.css](./index.css), then
   change every metric for the new key. Do not remove a role because it is not visibly used today.
3. Define every required role:

   ```text
   --type-display-xl-{size,line,weight,letter}
   --type-heading-{xl,lg,md,sm,xs,2xs}-{size,line,weight,letter}
   --type-body-{standard,lead,small}-{size,line,weight,letter}
   --type-rhythm-heading-margin-bottom
   --type-rhythm-paragraph-margin-bottom
   ```

4. Do not add `font-family`, Theme color tokens, component selectors, UI-pack selectors, or
   contextual aliases. Those belong to their respective systems.
5. Confirm `buildUiThemeAttrs` supplies the selected key as `data-ui-typography`.
6. Test display, heading, body, compact, and inverse-surface contexts. Run the typography boundary
   test, the type check, and production build.

The required dependency order remains:

```text
font family -> typography metrics -> UI-pack contextual alias -> component/template choice
```
