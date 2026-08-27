import type { InjectionKey, Ref } from 'vue'
export interface DropdownContext {
  open: Ref<boolean>
  disabled: Ref<boolean>
  trigger: Ref<HTMLElement | undefined>
  close: (restoreFocus?: boolean) => void
  toggle: () => void
}
export const dropdownContextKey: InjectionKey<DropdownContext> = Symbol('ui-dropdown')
