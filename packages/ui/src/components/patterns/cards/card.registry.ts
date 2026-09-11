import type { Component } from 'vue'
import TextCard from './text-card/TextCard.vue'
import TextListCard from './text-list-card/TextListCard.vue'
import FeatureCard from './feature-card/FeatureCard.vue'
import MediaCard from './media-card/MediaCard.vue'
import QuoteCard from './quote-card/QuoteCard.vue'
import PricingCard from './pricing-card/PricingCard.vue'
import StatCard from './stat-card/StatCard.vue'
import ProfileCard from './profile-card/ProfileCard.vue'

/** Shared card keys are the stable names returned by the page API. */
export const cardRegistry = {
  'text-card': TextCard,
  'text-list-card': TextListCard,
  'feature-card': FeatureCard,
  'media-card': MediaCard,
  'quote-card': QuoteCard,
  'pricing-card': PricingCard,
  'stat-card': StatCard,
  'profile-card': ProfileCard,
} as const satisfies Readonly<Record<string, Component>>

export type CardPatternKey = keyof typeof cardRegistry

export function resolveCardComponent(componentKey?: string | null, layout?: string | null): Component {
  // Legacy API data used `card` for the bulleted text-list pattern.
  if (componentKey === 'card' && layout === 'bulleted') return TextListCard
  return cardRegistry[componentKey as CardPatternKey] ?? TextCard
}
