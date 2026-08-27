# Section primitives

Compose `BaseSection`, `SectionHeader`, `SectionBody`, `SectionFooter`, and `SectionDivider` to build
semantic sections. Heading tags describe document structure; visual emphasis and wrapping are
independent presentation settings.

## SectionHeader title wrapping

`SectionHeader.titleWrap` is an allowlisted per-instance presentation option intended for manual
templates and future builder configuration:

| Value     | Behavior                                                                 |
| --------- | ------------------------------------------------------------------------ |
| `inherit` | Default. Use the active UI pack's SectionHeader wrapping behavior.       |
| `normal`  | Use ordinary line filling and wrapping.                                  |
| `pretty`  | Prefer improved line endings and avoid short final lines when supported. |
| `balance` | Balance short heading lines when supported.                              |

The precedence is:

```text
explicit titleWrap prop -> UI-pack --section-title-wrap alias -> normal component fallback
```

`titleWrap` does not change `titleAs`; two `h2` elements may use different wrapping behavior.

```vue
<SectionHeader
  title="Professional service without the runaround"
  title-as="h2"
  emphasis="standard"
  title-wrap="normal"
/>
```

Wrapping does not control the available line width. UI packs own the SectionHeader measure, and
templates own surrounding layout. A title that is wider than its available measure will still wrap.
