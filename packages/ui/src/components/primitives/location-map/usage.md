# LocationMap

`LocationMap` represents a location without exposing provider URLs or query parameters to templates.
The current adapter uses OpenStreetMap, but provider selection is deliberately internal until a
second real integration establishes a stable configuration requirement.

```vue
<LocationMap
  :location="{
    latitude: 36.1627,
    longitude: -86.7816,
    address: 'Nashville, Tennessee',
    title: 'Nashville office',
    zoom: 12,
    directionsUrl: 'https://example.com/directions',
  }"
/>
```

## Future serialization

The future API should serialize one ordinary location object:

```ts
interface LocationMapLocation {
  isVisible?: boolean
  latitude?: number | null
  longitude?: number | null
  address?: string
  zoom?: number
  directionsUrl?: string
  title?: string
}
```

`latitude` and `longitude` are jointly required to render a map. Without both valid coordinates,
the component renders its fallback. `title` is recommended for an intentional accessible iframe
name; the component otherwise derives a title from `address`. `zoom`, `directionsUrl`, and
`isVisible` are optional. Omitted `isVisible` means visible.

Templates own placement and whether they pass/render the component. Honoring `isVisible: false`
keeps normalized API data safe when a template binds the location directly. The API must not
serialize provider names, iframe URLs, bounding boxes, API keys, HTML, pack selection, aspect ratio,
or loading strategy inside the location payload. Provider credentials and selection belong in
application configuration if a future provider requires them.
