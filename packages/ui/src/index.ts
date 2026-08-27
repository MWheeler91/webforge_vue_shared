// =========================================================
// UI Library Entry Point
// =========================================================
import './styles/index.css'

// ---------------------------------------------------------
// Config
// ---------------------------------------------------------
export * from './config/ui.types.ts'
export * from './config/ui.defaults.ts'
export * from './config/ui.config.ts'
export * from './config/ui.resolve.ts'
export * from './config/ui.runtime.ts'

// ---------------------------------------------------------
// Button
// ---------------------------------------------------------
export { default as BaseButton } from './components/primitives/button/BaseButton.vue'

export type {
  ButtonVariant,
  ButtonSize,
  ButtonWidth,
  ButtonAs,
  ButtonLabelWrap,
  ButtonHtmlType,
} from './components/primitives/button/button.types.ts'

// ---------------------------------------------------------
// Badge
// ---------------------------------------------------------
export { default as BaseBadge } from './components/primitives/badge/BaseBadge.vue'

export type {
  BadgeVariant,
  BadgeTone,
  BadgeSize,
  BadgeLeading,
} from './components/primitives/badge/badge.types.ts'

// ---------------------------------------------------------
// Input
// ---------------------------------------------------------
export { default as FormInput } from './components/primitives/input/FormInput.vue'
export { default as FormPhoneInput } from './components/primitives/input/FormPhoneInput.vue'
export { default as FormSelect } from './components/primitives/input/FormSelect.vue'
export { default as FormTextarea } from './components/primitives/input/FormTextarea.vue'
export { default as BaseInput } from './components/primitives/input/BaseInput.vue'
export { default as BaseTextarea } from './components/primitives/input/BaseTextarea.vue'
export { default as BaseSelect } from './components/primitives/input/BaseSelect.vue'
export { default as BaseCheckbox } from './components/primitives/input/BaseCheckbox.vue'
export { default as BaseRadioGroup } from './components/primitives/input/BaseRadioGroup.vue'
export { default as BaseRadio } from './components/primitives/input/BaseRadio.vue'
export { default as BaseSwitch } from './components/primitives/input/BaseSwitch.vue'
export { default as BaseFileInput } from './components/primitives/input/BaseFileInput.vue'

export { default as PasswordInput } from './components/primitives/input/PasswordInput.vue'
export { default as PhoneInput } from './components/primitives/input/PhoneInput.vue'
export { default as EmailInput } from './components/primitives/input/EmailInput.vue'
export { default as SearchInput } from './components/primitives/input/SearchInput.vue'
export { default as NumberInput } from './components/primitives/input/NumberInput.vue'
export { default as CurrencyInput } from './components/primitives/input/CurrencyInput.vue'
export { default as PercentInput } from './components/primitives/input/PercentInput.vue'
export { default as ZipCodeInput } from './components/primitives/input/ZipCodeInput.vue'

export type {
  InputVariant,
  InputSize,
  InputType,
  TextareaResize,
  SelectOption,
  RadioValue,
  RadioGroupOrientation,
} from './components/primitives/input/input.types.ts'

// ---------------------------------------------------------
// Card primitives
// ---------------------------------------------------------
export { default as BaseCard } from './components/primitives/card/BaseCard.vue'
export { default as CardHeader } from './components/primitives/card/CardHeader.vue'
export { default as CardTitle } from './components/primitives/card/CardTitle.vue'
export { default as CardSubtitle } from './components/primitives/card/CardSubtitle.vue'
export { default as CardBody } from './components/primitives/card/CardBody.vue'
export { default as CardMedia } from './components/primitives/card/CardMedia.vue'
export { default as CardFooter } from './components/primitives/card/CardFooter.vue'
export { default as CardDivider } from './components/primitives/card/CardDivider.vue'
export { default as CardLink } from './components/primitives/card/CardLink.vue'

export type {
  BaseCardLinkProps,
  BaseCardProps,
  CardAction,
  CardAs,
  CardLinkAs,
  CardPadding,
  CardVariant,
  SharedCardProps,
  UiBadgePayload,
  UiCardAlignment,
  UiCardAuthorPayload,
  UiCardBorder,
  UiCardChartPayload,
  UiCardDensity,
  UiCardFooterPayload,
  UiCardMediaPlacement,
  UiCardMenuItemPayload,
  UiCardRadius,
  UiCardShadow,
  UiCardVerticalAlignment,
  UiElementCollection,
  UiMediaPayload,
  UiTextPayload,
} from './components/primitives/card/card.types.ts'

// ---------------------------------------------------------
// Media gallery patterns
// ---------------------------------------------------------
export * from './components/patterns/media-gallery/index.ts'
export type {
  SharedMediaGalleryProps,
  UiGalleryItemPayload,
} from './components/primitives/gallery/gallery.types.ts'

// ---------------------------------------------------------
// Content switcher patterns
// ---------------------------------------------------------
export * from './components/patterns/content-switchers/index.ts'
export type {
  SharedContentSwitcherProps,
  UiSwitcherItemPayload,
  UiSwitcherStatus,
} from './components/primitives/content-switcher/content-switcher.types.ts'

// ---------------------------------------------------------
// Page-heading and list patterns
// ---------------------------------------------------------
export * from './components/patterns/page-heading/index.ts'
export type {
  SharedPageHeadingProps,
  UiBreadcrumbPayload,
} from './components/primitives/page-heading/page-heading.types.ts'
export * from './components/patterns/lists/index.ts'
export type { SharedListProps, UiListItemPayload } from './components/primitives/list/list.types.ts'

// ---------------------------------------------------------
// Card patterns
// ---------------------------------------------------------
export * from './components/patterns/cards/index.ts'

// ---------------------------------------------------------
// Section primitives
// ---------------------------------------------------------
export { default as BaseSection } from './components/primitives/section/BaseSection.vue'
export { default as SectionHeader } from './components/primitives/section/SectionHeader.vue'
export { default as SectionBody } from './components/primitives/section/SectionBody.vue'
export { default as SectionFooter } from './components/primitives/section/SectionFooter.vue'
export { default as SectionDivider } from './components/primitives/section/SectionDivider.vue'
export type {
  SectionVariant, SectionWidth, SectionSpacing, SectionAlign, SectionTitleAs, SectionTitleEmphasis,
  SectionTitleWrap, SectionLayout, SectionGrid, SectionGap, SharedSectionProps, SectionCardCollection,
  SectionCardInputCollection, SectionCardInput, ResolvedSectionCard, ResolvedSectionCardCollection,
  ResolvedSectionProps,
} from './components/primitives/section/section.types.ts'

// ---------------------------------------------------------
// Layout primitives
// ---------------------------------------------------------

export { default as BaseContainer } from './components/primitives/container/BaseContainer.vue'

export type {
  ContainerWidth,
  ContainerPadding,
} from './components/primitives/container/container.types.ts'

export { default as UiGrid } from './components/primitives/grid/UiGrid.vue'
export { uiGridPreview } from './components/primitives/grid/UiGrid.preview.ts'
export type {
  UiGridAlignment,
  UiGridGap,
  UiGridProps,
} from './components/primitives/grid/grid.types.ts'

export { default as LocationMap } from './components/primitives/location-map/LocationMap.vue'
export {
  locationMapPreview,
  locationMapPackPreview,
} from './components/primitives/location-map/LocationMap.preview.ts'
export type {
  LocationMapAspectRatio,
  LocationMapLoading,
  LocationMapLocation,
  LocationMapProps,
} from './components/primitives/location-map/locationMap.types.ts'

// ---------------------------------------------------------
// Navbar primitives
// ---------------------------------------------------------
export { resolveNavbarComponent } from './components/patterns/navigation/navigation.registry.ts'
export { default as BaseNavbar } from './components/primitives/navigation/BaseNavbar.vue'
export { default as NavbarBrand } from './components/primitives/navigation/NavbarBrand.vue'
export { default as NavbarNav } from './components/primitives/navigation/NavbarNav.vue'
export { default as NavbarLink } from './components/primitives/navigation/NavbarLink.vue'
export { default as NavbarActions } from './components/primitives/navigation/NavbarActions.vue'
export { default as NavbarToggle } from './components/primitives/navigation/NavbarToggle.vue'

// ---------------------------------------------------------
// Navigation patterns
// ---------------------------------------------------------
export * from './components/patterns/navigation/index.ts'

export type {
  NavbarPack,
  NavbarSurfaceVariant,
  NavbarLegacyVisualVariant,
  NavbarVariant,
  NavbarSize,
  NavbarPosition,
  NavbarLayout,
  NavbarAction,
  NavbarBrandImagePosition,
  NavbarLinkItem,
  NavbarBrandData,
  NavbarActionVariant,
  SharedNavbarProps,
  NavbarMenuPayload,
} from './components/primitives/navigation/navigation.types.ts'

// ---------------------------------------------------------
// Footer primitives
// ---------------------------------------------------------

export { default as BaseFooter } from './components/primitives/footer/BaseFooter.vue'
export { default as FooterBrand } from './components/primitives/footer/FooterBrand.vue'
export { default as FooterSection } from './components/primitives/footer/FooterSection.vue'
export { default as FooterNav } from './components/primitives/footer/FooterNav.vue'
export { default as FooterLink } from './components/primitives/footer/FooterLink.vue'
export { default as FooterSocial } from './components/primitives/footer/FooterSocial.vue'
export { default as FooterLegal } from './components/primitives/footer/FooterLegal.vue'
export { default as FooterLegalBar } from './components/primitives/footer/FooterLegalBar.vue'

// ---------------------------------------------------------
// Footer patterns
// ---------------------------------------------------------

export * from './components/patterns/footer/index.ts'
export type { FooterBrandData, FooterLinkItem, FooterSectionItem, FooterSocialItem, FooterTemplateProps, SharedFooterProps, FooterColumnPayload } from './components/primitives/footer/footer.types.ts'

// ---------------------------------------------------------
// Toast
// ---------------------------------------------------------

export { default as BaseToast } from './components/primitives/toast/BaseToast.vue'
export { default as ToastViewport } from './components/primitives/toast/ToastViewport.vue'

export { useToast } from './components/primitives/toast/toast.runtime.ts'

export type {
  ToastPack,
  ToastVariant,
  ToastPosition,
  ToastItem,
  ToastOptions,
  ToastViewportConfig,
} from './components/primitives/toast/toast.types.ts'

// ---------------------------------------------------------
// Calendar
// ---------------------------------------------------------

export { default as Calendar } from './components/primitives/calendar/Calendar.vue'
export {
  calendarPreview,
  calendarPackPreview,
} from './components/primitives/calendar/Calendar.preview.ts'
export type {
  CalendarDatePredicate,
  CalendarMonthChange,
  CalendarProps,
  CalendarWeekStartsOn,
} from './components/primitives/calendar/calendar.types.ts'

// ---------------------------------------------------------
// Tabs
// ---------------------------------------------------------

export { default as BaseTabs } from './components/primitives/tabs/BaseTabs.vue'
export { default as TabList } from './components/primitives/tabs/TabList.vue'
export { default as TabTrigger } from './components/primitives/tabs/TabTrigger.vue'
export { default as TabPanel } from './components/primitives/tabs/TabPanel.vue'
export { tabsPreview, tabsPackPreview } from './components/primitives/tabs/Tabs.preview.ts'
export type { TabsOrientation } from './components/primitives/tabs/tabs.types.ts'

// Accordion
export { default as BaseAccordion } from './components/primitives/accordion/BaseAccordion.vue'
export { default as AccordionItem } from './components/primitives/accordion/AccordionItem.vue'
export { default as AccordionTrigger } from './components/primitives/accordion/AccordionTrigger.vue'
export { default as AccordionPanel } from './components/primitives/accordion/AccordionPanel.vue'
export type { AccordionAnimation } from './components/primitives/accordion/accordion.types.ts'
export {
  accordionPreview,
  accordionPackPreview,
} from './components/primitives/accordion/Accordion.preview.ts'

// Alert
export { default as BaseAlert } from './components/primitives/alert/BaseAlert.vue'
export { default as AlertTitle } from './components/primitives/alert/AlertTitle.vue'
export { default as AlertDescription } from './components/primitives/alert/AlertDescription.vue'
export type { AlertVariant } from './components/primitives/alert/alert.types.ts'
export { alertPreview, alertPackPreview } from './components/primitives/alert/Alert.preview.ts'

// Dropdown
export { default as BaseDropdown } from './components/primitives/dropdown/BaseDropdown.vue'
export { default as DropdownTrigger } from './components/primitives/dropdown/DropdownTrigger.vue'
export { default as DropdownMenu } from './components/primitives/dropdown/DropdownMenu.vue'
export { default as DropdownItem } from './components/primitives/dropdown/DropdownItem.vue'
export {
  dropdownPreview,
  dropdownPackPreview,
} from './components/primitives/dropdown/Dropdown.preview.ts'

// Table
export { default as BaseTable } from './components/primitives/table/BaseTable.vue'
export { default as TableHeader } from './components/primitives/table/TableHeader.vue'
export { default as TableBody } from './components/primitives/table/TableBody.vue'
export { default as TableRow } from './components/primitives/table/TableRow.vue'
export { default as TableCell } from './components/primitives/table/TableCell.vue'
export type { TableAlign } from './components/primitives/table/table.types.ts'
export { tablePreview, tablePackPreview } from './components/primitives/table/Table.preview.ts'

// Breadcrumb
export { default as BaseBreadcrumb } from './components/primitives/breadcrumb/BaseBreadcrumb.vue'
export { default as BreadcrumbItem } from './components/primitives/breadcrumb/BreadcrumbItem.vue'
export type { BreadcrumbItemProps } from './components/primitives/breadcrumb/breadcrumb.types.ts'
export {
  breadcrumbPreview,
  breadcrumbPackPreview,
} from './components/primitives/breadcrumb/Breadcrumb.preview.ts'

// ---------------------------------------------------------
// Color theme
// ---------------------------------------------------------

export { THEME_COLOR_KEYS, applyThemeColors, resolveThemeColors } from './config/color.runtime.ts'

export { defaultThemeColors } from './config/color.defaults.ts'

export type { ThemeColors, PartialThemeColors } from './config/color.types.ts'
