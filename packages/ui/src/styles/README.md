# Styles and Packs

This is the canonical guide for CSS architecture and for authoring selectable UI and typography
packs. The public stylesheet entrypoint is `styles/index.css`.

## Organization recommendation

The current import order is correct:

```text
tokens -> base -> fonts -> typography -> utilities -> component CSS
       -> UI packs -> semantic surfaces -> motion overrides
```

The library now uses this maintenance-oriented structure. Do not add a vague `globals/` folder:

```text
styles/
  foundation/          # tokens, base, surfaces, utilities
  components/          # structural/default component CSS
  systems/
    font.css
    typography/
      index.css
      README.md
    motion.css
    ui-packs/          # one CSS file per UI pack
  index.css
```

`foundation` separates non-selectable CSS foundations from selectable visual systems.

## Ownership

| Layer           | Owns                                                     | Must never own                           |
| --------------- | -------------------------------------------------------- | ---------------------------------------- |
| Theme tokens    | Semantic colors and effects                              | Type metrics, component structure        |
| Component CSS   | Structure and safe component defaults                    | Tenant colors, page composition          |
| UI pack         | Cohesive component treatment and contextual type aliases | Color palette, global type metrics, APIs |
| Typography pack | Global `--type-*` role metrics                           | Component selectors, font families       |
| Font selection  | `--font-body`, `--font-display`, `--font-mono`           | Hierarchy and component treatment        |
| Motion          | Configured behavior overrides                            | Semantics and pack identity              |

Theme values are runtime tokens, not a pack. Packs consume the Theme contract and must never define
tenant colors. The required semantic tokens are:

```text
--brand, --brand_hover, --brand_active, --brand_soft, --brand_contrast,
--brand_ring, --text_on_brand, --secondary, --success, --warning, --error, --info,
--bg_canvas, --bg_surface, --bg_elevated, --bg_field, --bg_muted, --bg_inverse,
--bg_disabled, --text_primary, --text_secondary, --text_muted, --text_inverse,
--text_disabled, --border_default, --border_muted, --border_focus, --overlay, --shadow_rgba
```

`foundation/surfaces.css` owns semantic foreground/background meaning and intentionally loads after UI packs.

## UI packs

### Purpose and supported keys

A UI pack is a selectable, cross-component visual language. It owns decoration, shape treatment,
borders, shadows, component density treatment, interaction treatment, and contextual typography
aliases. It does not own theme colors or typography metrics.

Supported keys: `default`, `lux`, `classic`, `minimal`, `block`, `soft`, `glass`, `editorial`,
`neon`, `corporate`, `paper`, `chaos`, and `fantasy`. Each has one file in `styles/systems/ui-packs/`, is imported by
`styles/index.css`, and is listed in `UiPack`.

### Required file and coverage

Create exactly one file: `styles/systems/ui-packs/<pack-key>.css`, using lowercase kebab-case. A supported
pack must provide deliberate treatment for every currently pack-aware family:

```text
button, badge, card, input, textarea, input shell, select, select shell, file input,
checkbox, radio, switch, navbar, footer, section, section header, section divider, toast,
tabs, accordion, dropdown, table, alert, breadcrumb, location map
```

Use the resolved component classes, never broad or template selectors:

```css
.ui-btn--pack-example {
  /* treatment */
}
.ui-card--pack-example {
  /* treatment */
}
.ui-section-header--pack-example {
  /* contextual aliases */
}
```

Calendar inherits pack treatment through its `BaseCard` root. Coordinated child components inherit
from their pack-aware family root. The package does not contain a separate pack-coverage registry; inspect
the selectors in each pack stylesheet when auditing coverage.

### Required variables

UI packs define no required color values; they consume the Theme tokens above and current-surface
roles such as `--ui-current-text-primary`. They must never declare `--type-*`, `--font-*`, or a
Theme token. A pack may provide documented contextual aliases, mapping them to global type roles:

```css
.ui-section-header--pack-example {
  --section-title-wrap: balance;
  --section-title-prominent-size: var(--type-display-xl-size);
  --section-title-standard-size: var(--type-heading-lg-size);
  --section-title-compact-size: var(--type-heading-md-size);
}
```

### Create a UI pack

1. Copy `systems/ui-packs/default.css` so no pack-aware family is omitted.
2. Rename every selector to the new key and replace treatment using semantic tokens.
3. Implement hover, active, `:focus-visible`, disabled, validation, and checked/selected states.
4. Import the file in `styles/index.css` before `foundation/surfaces.css` and `systems/motion.css`.
5. Add the key to `UiPack` in `config/ui.types.ts` and update any enumerated config documentation.
6. Test light, inverse, disabled, keyboard focus, validation, and reduced-motion contexts.

### UI-pack validation

- [ ] Imported once and registered in `UiPack`.
- [ ] Every required family has intentional coverage.
- [ ] No hardcoded tenant palette, `--type-*`, `--font-*`, or Theme token declaration.
- [ ] Semantic variants and inverse/brand surfaces still work.
- [ ] Focus indicators remain visible; disabled and validation states are understandable.
- [ ] Type check, production build, and relevant visual/style tests pass.

### Common mistakes

- Defining colors in a pack instead of consuming Theme tokens.
- Styling `.ui-btn` or template selectors without a pack scope.
- Copying typography metrics into the pack instead of mapping aliases.
- Forgetting input/select shell, file-input, checked, or keyboard-focus states.
- Removing focus visibility in favor of a hover-only effect.

## Typography packs

### Purpose and supported keys

A typography pack is a global metric preset selected by `data-ui-typography`. It defines scale,
line height, weight, letter spacing, and rhythm only. It is independent of UI-pack and font
selection.

Supported keys: `default`, `compact`, `classic`, `modern`, `display`, `editorial`, `luxury`,
`playful`, and `technical`.

```text
font family -> typography role metrics -> UI-pack contextual alias -> component/template choice
```

### Required file and variables

Typography presets live in `styles/systems/typography/index.css`; a new pack adds one
`[data-ui-typography='<key>']` block. Every block must define the complete role set:

```text
--type-display-xl-{size,line,weight,letter}
--type-heading-{xl,lg,md,sm,xs,2xs}-{size,line,weight,letter}
--type-body-{standard,lead,small}-{size,line,weight,letter}
--type-rhythm-heading-margin-bottom
--type-rhythm-paragraph-margin-bottom
```

Typography packs must not contain component selectors, contextual aliases, `--font-*`, or Theme
tokens.

### Create a typography pack

1. Copy the complete `default` preset block in `systems/typography/index.css`.
2. Set every role metric; do not set font families here.
3. Add the key to `UiTypography` in `config/ui.types.ts`.
4. Confirm `buildUiThemeAttrs` exposes it as `data-ui-typography`.
5. Extend `styles/typography.test.ts` if the role contract itself changes.

### Typography-pack validation

- [ ] Registered in `UiTypography` and selectable through the data attribute.
- [ ] Every required role and four metrics are defined.
- [ ] No component selector, alias, color token, or font token appears.
- [ ] Display, heading, body, compact, and inverse contexts remain legible.
- [ ] Typography boundary tests, type check, and build pass.

### Common mistakes

- Defining font-family or a component selector in the preset.
- Omitting a role and accidentally inheriting unrelated metrics.
- Using typography to encode grid, width, or semantic heading choice.

## Font and motion systems

Font selections live in `systems/font.css`. A new option adds a `[data-ui-font='<key>']` block, a
`UiFont` member, and all three family variables: `--font-body`, `--font-display`, and `--font-mono`. The current
independent display option set includes `new-rocker`; IBM Plex Mono is provided by `industrial-mono`. Font files
and loading remain the consuming application's responsibility; the shared package provides family mappings and
fallback stacks only.
Font loading and licensing are application concerns outside this CSS contract.

Motion lives in `systems/motion.css` and loads after packs. Pack base transitions may vary, but configured
`none`, `reduced`, `normal`, and `expressive` overrides must continue to work. Honor
`prefers-reduced-motion` wherever animation is introduced.

## Entrypoint rule

Keep `styles/index.css` in this order: foundation and selected systems, component base CSS, all UI
packs, semantic surfaces, then motion overrides.
