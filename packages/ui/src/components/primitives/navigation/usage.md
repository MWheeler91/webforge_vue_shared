# Navigation

`BaseNavbar` owns semantic navigation markup, responsive desktop/mobile regions, expansion state,
position (`static`, `sticky`, or `fixed`), and content layout. `StandardNavbar`, `CenteredNavbar`,
and `SplitNavbar` are structural compositions of the same primitives.

The active UI pack owns borders, shadows, link and active treatment, contextual spacing and
typography, and mobile-menu presentation. `pack` is an optional instance override using the complete
shared `UiPack` union; omission inherits navbar/global UI configuration.

## Surface variants

- `surface`: ordinary themed navbar surface.
- `transparent`: transparent semantic surface. It does not overlay a hero or remove the navbar from
  document flow; template composition and `position` own that behavior.
- `inverse`: inverse semantic surface.
- `bordered` and `floating`: deprecated visual variants retained for compatibility. Prefer
  `surface` and let the selected UI pack provide visual treatment.

```vue
<StandardNavbar
  :brand="{ label: 'Wheeler Web', href: '/' }"
  :links="links"
  position="sticky"
  variant="surface"
/>
```

Use `BaseNavbar` with `brand`, `nav`, `actions`, and optional `toggle` slots for a custom reusable
structure. The mobile button supplies its label, expanded state, and controlled panel relationship.
