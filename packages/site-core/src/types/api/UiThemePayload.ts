/** Tailwind class string (can be empty) */
export type Tw = string

/** Generic string map */
export type TwMap = Record<string, Tw>

/** Helpful for key-locked maps while allowing future extension */
export type ExtMap<K extends string, V> = Record<K, V> & Record<string, V>

/* ----------------------------- ROOT UI THEME ----------------------------- */

export type UiTheme = {
  card: CardTheme
  button: ButtonTheme
  input: InputTheme
  badge: BadgeTheme
  navbar: NavbarTheme
  footer: FooterTheme
  section: SectionTheme
  typography: TypographyTheme
}

export type CardTheme = { ui: CardUI }
export type ButtonTheme = { ui: ButtonUI }
export type InputTheme = { ui: InputUI }
export type BadgeTheme = { ui: BadgeUI }
export type NavbarTheme = { ui: NavbarUI }
export type FooterTheme = { ui: FooterUI }
export type SectionTheme = { ui: SectionUI }
export type TypographyTheme = { ui: TypographyUI }

/* --------------------------------- CARD --------------------------------- */

export type CardRadiusKey = "none" | "sm" | "md" | "lg"
export type CardPaddingKey = "none" | "sm" | "md" | "lg"

export type CardVariantKey =
  | "default"
  | "muted"
  | "outline"
  | "elevated"
  | "inverse"
  | "interactive"

export type CardLayoutKey = "ctaStrip" | "mediaTop" | "horizontal" | "mediaInset"

export type CardUI = {
  base?: Tw
  layout?: ExtMap<CardLayoutKey, CardLayoutPreset>
  radius: ExtMap<CardRadiusKey, Tw>
  padding: ExtMap<CardPaddingKey, Tw>
  divider?: Tw
  sections?: CardSections
  variants: ExtMap<CardVariantKey, CardVariantParts>
}

export type CardLayoutPreset = {
  wrap?: Tw
  body?: Tw
  actions?: Tw
  media?: Tw
  content?: Tw
  mediaWrap?: Tw
}

export type CardSections = {
  header?: Tw
  body?: Tw
  media?: Tw
  footer?: Tw
  actions?: Tw
}

export type CardVariantParts = {
  shell: Tw
  hover?: Tw
  active?: Tw
}

/* -------------------------------- BUTTON -------------------------------- */

export type ButtonSizeKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type ButtonVariantKey =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "ghost"
  | "link"
  | "chip"

export type ButtonUI = {
  base: Tw
  size: ExtMap<ButtonSizeKey, Tw>
  compat?: {
    aliases: Record<string, string> // e.g. outline -> secondary, destructive -> danger
  }
  states?: {
    loading: Tw
    disabled: Tw
    loadingSpinner: Tw
  }
  compound?: {
    iconOnly: ExtMap<ButtonSizeKey, Tw>
    fullWidth: Tw
  }
  defaults: {
    size: ButtonSizeKey
    variant: ButtonVariantKey
  }
  variants: ExtMap<ButtonVariantKey, ButtonVariantParts>
}

export type ButtonVariantParts = {
  shell: Tw
  hover: Tw
  active: Tw
  focus: Tw
}

/* --------------------------------- INPUT -------------------------------- */

export type InputSizeKey = "sm" | "md" | "lg"

export type InputVariantKey =
  | "default"
  | "outline"
  | "subtle"
  | "ghost"
  | "error"
  | "success"
  | "disabled"

export type InputUI = {
  wrap?: {
    base: Tw
  }

  label?: Tw
  hint?: Tw
  errorText?: Tw

  input: {
    base?: Tw
    size: ExtMap<InputSizeKey, Tw>
    variants: ExtMap<InputVariantKey, InputVariantParts>
  }

  textarea: {
    base?: Tw
    footerRow?: Tw
    counter?: {
      base: Tw
      state: {
        normal: Tw
        warn: Tw
        limit: Tw
      }
    }
  }
}

export type InputVariantParts = {
  shell: Tw
  focus: Tw
}

/* --------------------------------- BADGE -------------------------------- */

export type BadgeSizeKey =  "xs" | "sm" | "md" | "lg"

/** These are the semantic “color” variants */
export type BadgeVariantKey = "neutral" | "brand" | "info" | "success" | "warning" | "error"

/** These are the “style” modes */
export type BadgeStyleKey = "soft" | "ghost" | "solid" | "outline"

export type BadgeLeadingDotSizeKey = "xs" | "sm" | "md" | "lg"

export type BadgeUI = {
  base?: Tw
  size?: ExtMap<BadgeSizeKey, Tw>
  text?: Tw

  style: ExtMap<BadgeStyleKey, Tw>

  leading: {
    wrap: Tw
    iconWrap: Tw
    dot: {
      base: Tw
      size: ExtMap<BadgeLeadingDotSizeKey, Tw>
      variant: ExtMap<BadgeVariantKey, Tw>
    }
  }

  // NOTE: your JSON uses `variant` for semantic colors
  variant: ExtMap<BadgeVariantKey, Tw>
}

/* -------------------------------- NAVBAR -------------------------------- */

export type NavbarLayoutKey = "left" | "split" | "center"
export type NavbarSizeKey = "sm" | "md" | "lg"
export type NavbarVariantKey = "default" | "elevated" | "transparent"

export type NavbarUI = {
  wrapper: {
    base: Tw
    sticky: Tw
    variants: ExtMap<NavbarVariantKey, Tw>
  }

  container: {
    base: Tw
    width: Tw
    size: ExtMap<NavbarSizeKey, Tw>
  }

  inner: {
    base: Tw
    layout: ExtMap<NavbarLayoutKey, Tw>
  }

  slots: {
    left: Tw
    nav: Tw
    right: Tw
    mobile: Tw
  }

  link: {
    base: Tw
    active: Tw
    inactive: Tw
  }

  mobile: {
    overlay: Tw
    toggle: Tw
    panel: Tw
    panelHeader: Tw
    panelNav: Tw
    panelFooter: Tw
    brand: Tw
    close: Tw
  }

  defaults: {
    size: NavbarSizeKey
    layout: NavbarLayoutKey
    variant: NavbarVariantKey
  }
}

/* -------------------------------- FOOTER -------------------------------- */

export type FooterSizeKey = "sm" | "md" | "lg"
export type FooterVariantKey = "default" | "muted" | "elevated" | "transparent"

export type FooterUI = {
  wrap: {
    base: Tw
    variants: ExtMap<FooterVariantKey, Tw>
  }

  container: {
    base: Tw
    width: Tw
    size: ExtMap<FooterSizeKey, Tw>
  }

  title: Tw
  link: Tw
  iconLink: Tw
  divider: Tw
  metaRow: Tw

  defaults: {
    size: FooterSizeKey
    variant: FooterVariantKey
  }
}

/* -------------------------------- SECTION -------------------------------- */

export type SectionAlignKey = "left" | "center" | "right"
export type SectionVariantKey = "default" | "muted" | "inverse" | "elevated" | "transparent"
export type SectionGapYKey = "sm" | "md" | "lg" | "xl"
export type SectionContainerSizeKey = "sm" | "md" | "lg" | "xl"
export type SectionContainerWidthKey = "sm" | "md" | "lg" | "xl" | "full"

export type SectionUI = {
  wrapper: {
    base: Tw
    bleed: Tw
    variants: ExtMap<SectionVariantKey, Tw>
  }

  container: {
    base: Tw
    size: ExtMap<SectionContainerSizeKey, Tw>
    width: ExtMap<SectionContainerWidthKey, Tw>
  }

  header: {
    wrap: Tw
    align: ExtMap<SectionAlignKey, Tw>
  }

  content: {
    base: Tw
    grid: Tw
    stack: Tw
    gapY: ExtMap<SectionGapYKey, Tw>
  }

  divider: Tw
}

/* ------------------------------- TYPOGRAPHY ------------------------------ */

export type TypographyUI = {
  fonts: {
    body: string
    display: string
    mono: string
  }

  scale: {
    h1: TypographyScale
    h2: TypographyScale
    h3: TypographyScale
    h4: TypographyScale
    h5: TypographyScale
    h6: TypographyScale
  }

  body: {
    p: TypographyBody
    lead: TypographyBody
    small: TypographyBody
  }

  link: {
    underlineOffset: string
    decorationThickness: string
  }

  rhythm: {
    listIndent: string
    listItemSpacing: string
    headingMarginTop: string
    headingMarginBottom: string
    paragraphMarginBottom: string
  }
}

export type TypographyScale = {
  size: string
  line: string
  weight: string | number
  letter: string
}

export type TypographyBody = {
  size: string
  line: string
  weight: string | number
}