import type { InjectionKey, Ref } from 'vue'

export type TabsOrientation = 'horizontal' | 'vertical'

export interface TabsContext {
  activeValue: Ref<string>
  orientation: Ref<TabsOrientation>
  disabled: Ref<boolean>
  registerTrigger: (value: string, element: HTMLButtonElement) => void
  unregisterTrigger: (value: string) => void
  select: (value: string) => void
  moveFocus: (value: string, direction: number) => void
}

export const tabsContextKey: InjectionKey<TabsContext> = Symbol('ui-tabs')
