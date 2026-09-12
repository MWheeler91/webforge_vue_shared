export { default as TextCard } from './text-card/TextCard.vue'
export type { TextCardProps } from './text-card/TextCard.types.ts'

export { default as FeatureCard } from './feature-card/FeatureCard.vue'
export type { FeatureCardLayout, FeatureCardMediaAspect, FeatureCardProps } from './feature-card/FeatureCard.types.ts'

export { default as UiCardRenderer } from './UiCardRenderer.vue'
export { cardRegistry, resolveCardComponent } from './card.registry.ts'

export { default as TextListCard } from './text-list-card/TextListCard.vue'
export type {
  TextListCardItem,
  TextListCardLayout,
  TextListCardMarker,
  TextListCardProps,
} from './text-list-card/TextListCard.types.ts'

export * from './media-card/index.ts'

export { default as QuoteCard } from './quote-card/QuoteCard.vue'
export type { QuoteCardClamp, QuoteCardLayout, QuoteCardProps } from './quote-card/QuoteCard.types.ts'

export { default as PricingCard } from './pricing-card/PricingCard.vue'
export type { PricingCardLayout, PricingCardProps } from './pricing-card/PricingCard.types.ts'

export { default as StatCard } from './stat-card/StatCard.vue'
export type { StatCardLayout, StatCardProps } from './stat-card/StatCard.types.ts'

export { default as ProfileCard } from './profile-card/ProfileCard.vue'
export type { ProfileCardLayout, ProfileCardProps } from './profile-card/ProfileCard.types.ts'

// `action-card/` intentionally has no export here. It is a draft, copied in
// from the app-local `DemoActionCard` (playground's old pre-rewrite
// component) so `card-gallery` no longer has to reach into app-local demo
// code, not a finished pattern — it hasn't been through the narrow
// per-component-props rewrite every other card above has, and there is no
// Django `Component` catalog row for `action-card` yet (see
// COMPONENTS_AWAITING_DEV.md, Cards section). Do not export or build on it
// until that real design/dev pass happens.
