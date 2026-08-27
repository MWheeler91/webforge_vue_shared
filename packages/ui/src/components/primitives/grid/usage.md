# UiGrid

`UiGrid` is the standard responsive collection layout. It uses CSS Grid `auto-fit` behavior, so
templates choose a meaningful minimum item width rather than maintaining breakpoint-specific column
counts.

```vue
<UiGrid :min-item-width="280" :max-columns="4" gap="md" equal-height>
  <FeatureCard v-for="service in services" :key="service.key" v-bind="service" />
</UiGrid>
```

Templates own whether a grid is used, the items placed inside it, and deliberate instance settings
such as minimum width, maximum columns, and spacing. `UiGrid` owns width normalization, automatic
wrapping, the maximum-column calculation, alignment, and equal-row behavior.

For a future builder, layout presets may map to `minItemWidth`, `maxColumns`, `gap`, `rowGap`,
`align`, `justify`, and `equalHeight` after template validation. The raw CSS algorithm, arbitrary
CSS lengths, semantic `as` value, and `dense` flow must not be editor-controlled. Dense flow may
change visual order and therefore requires an intentional template-level accessibility decision.

`UiGrid` deliberately does not apply `role="grid"`. That ARIA role describes an interactive
two-dimensional widget; ordinary card and article collections retain their native semantics.
