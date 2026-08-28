import type { Component } from 'vue'
import TextCard from './text-card/TextCard.vue'
import TextListCard from './text-list-card/TextListCard.vue'

/** Shared card keys are the stable names returned by the page API. */
export const cardRegistry = {
  'text-card': TextCard,
  'text-list-card': TextListCard,
} as const satisfies Readonly<Record<string, Component>>

export type CardPatternKey = keyof typeof cardRegistry

export function resolveCardComponent(componentKey?: string | null, layout?: string | null): Component {
  // Legacy API data used `card` for the bulleted text-list pattern.
  if (componentKey === 'card' && layout === 'bulleted') return TextListCard
  return cardRegistry[componentKey as CardPatternKey] ?? TextCard
}
