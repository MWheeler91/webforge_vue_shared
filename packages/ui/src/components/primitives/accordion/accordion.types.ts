import type { ComputedRef, InjectionKey, Ref } from 'vue'
export type AccordionAnimation = 'none' | 'slide'

export interface AccordionContext {
  openValues: Ref<string[]>
  multiple: Ref<boolean>
  animation: Ref<AccordionAnimation>
  toggle: (value: string) => void
}
export const accordionContextKey: InjectionKey<AccordionContext> = Symbol('ui-accordion')
export interface AccordionItemContext {
  open: ComputedRef<boolean>
  value: string
  disabled: ComputedRef<boolean>
  toggle: () => void
}
export const accordionItemContextKey: InjectionKey<AccordionItemContext> =
  Symbol('ui-accordion-item')
