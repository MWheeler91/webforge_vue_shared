# UI Packs

UI packs are selectable visual languages for the component library. They are independent of Theme
colors, font selection, and typography metrics. A pack coordinates how component families look and
feel together: shape, borders, shadows, density treatment, decoration, interaction treatment, and
contextual typography aliases.

The active pack is resolved through the UI configuration and appears on pack-aware components as a
class such as `.ui-btn--pack-default` or `.ui-card--pack-editorial`.

## Current UI packs

| Key         | Description                                                          |
| ----------- | -------------------------------------------------------------------- |
| `default`   | Balanced baseline system and the coverage template for new packs.    |
| `lux`       | Refined, elevated treatment with premium spacing and surface detail. |
| `classic`   | Familiar, restrained treatment with conventional visual hierarchy.   |
| `minimal`   | Reduced decoration and quiet surfaces.                               |
| `block`     | Strong, graphic borders and assertive block-like treatment.          |
| `soft`      | Rounded, gentle surfaces and forgiving visual treatment.             |
| `glass`     | Translucent, layered surface treatment.                              |
| `editorial` | Content-led, typographically expressive presentation.                |
| `neon`      | High-energy contrast and glow-oriented treatment.                    |
| `corporate` | Clear, stable, professional interface treatment.                     |
| `paper`     | Tactile, print-inspired surface treatment.                           |
| `chaos`     | Deliberately expressive, unconventional visual treatment.            |
| `fantasy`   | Heraldic framing, crisp edges, restrained depth, and weighty states. |

## What a UI pack owns

A pack may style the following currently pack-aware families:

```text
button, badge, card, input, textarea, input shell, select, select shell, file input,
checkbox, radio, switch, navbar, footer, section, section header, section divider, toast,
tabs, accordion, dropdown, table, alert, breadcrumb, location map
```

It must scope styles to the resolved pack class. For example:

```css
.ui-btn--pack-example {
  /* component treatment */
}
.ui-card--pack-example {
  /* component treatment */
}
.ui-section-header--pack-example {
  /* contextual aliases */
}
```

Calendar inherits pack treatment through `BaseCard`. Coordinated children such as `TabTrigger` and
`DropdownItem` inherit the custom-property treatment emitted by their family root.
`UiGrid` remains intentionally neutral because it owns layout rather than a visible component
surface.

## What a UI pack must never own

- Tenant colors or a new color palette. Consume Theme tokens such as `--brand`, `--bg_surface`,
  `--text_primary`, `--border_default`, and `--shadow_rgba`.
- Global typography metrics (`--type-*`) or font-family values (`--font-*`).
- Component markup, public props, semantic heading selection, templates, routes, or data shapes.
- Broad unscoped component selectors or template/application selectors.

Semantic surface meaning remains owned by `foundation/surfaces.css`, which loads after every pack.

## Create a new UI pack

1. Choose a lowercase kebab-case key, for example `artisan`.
2. Copy [default.css](./default.css) to `styles/systems/ui-packs/artisan.css`. Start with complete
   family coverage; do not start from a blank file.
3. Rename all `--pack-default` selectors to `--pack-artisan`.
4. Change treatment using semantic Theme tokens. Preserve component variants and current-surface
   foreground roles rather than overriding them with literal colors.
5. Implement every relevant state: hover, active, `:focus-visible`, disabled, error/success/warning,
   and checked/indeterminate controls.
6. If the pack styles `SectionHeader`, define only documented contextual aliases that map to
   typography roles, for example:

   ```css
   .ui-section-header--pack-artisan {
     --section-title-wrap: balance;
     --section-title-prominent-size: var(--type-display-xl-size);
     --section-title-standard-size: var(--type-heading-lg-size);
     --section-title-compact-size: var(--type-heading-md-size);
   }
   ```

7. Import `artisan.css` in `styles/index.css` before `foundation/surfaces.css` and
   `systems/motion.css`.
8. Add `artisan` to `UiPack` in `config/ui.types.ts` and update configuration documentation that
   lists available pack values.
9. Add or update tests when the pack adds a new documented alias or selector contract.

## Validation checklist

- [ ] Pack file is imported exactly once and its key is in `UiPack`.
- [ ] Every pack-aware family has intentional coverage.
- [ ] No Theme token, `--type-*`, or `--font-*` is declared in the pack.
- [ ] No tenant-specific literal palette or template selector was added.
- [ ] Focus indicators are visible with adequate contrast.
- [ ] Disabled, validation, checked, inverse, and brand-surface states still communicate clearly.
- [ ] Button/card configured motion overrides still work after the pack is applied.
- [ ] Run the relevant tests, `npm run type-check`, and `npm run build`.

## Common mistakes

- Defining the brand palette in the pack instead of consuming Theme tokens.
- Styling `.ui-btn` globally rather than `.ui-btn--pack-<key>`.
- Copying `--type-*` metric declarations from a typography preset into a pack.
- Omitting input/select shell, file input, or keyboard-focus treatment.
- Removing a focus ring to make hover styling look cleaner.
- Using a pack to solve a template-specific layout or a missing component API.
