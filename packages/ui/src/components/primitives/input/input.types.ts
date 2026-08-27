export type InputVariant = 'default' | 'error' | 'success' | 'warning'

export type InputSize = 'sm' | 'md' | 'lg'

export type InputType = 'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url'

export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both'

export type ControlSize = 'sm' | 'md' | 'lg'

export type RadioValue = string | number | boolean

export type RadioGroupOrientation = 'vertical' | 'horizontal'

export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

export interface BaseInputProps {
  modelValue?: string | number
  type?: InputType
  variant?: InputVariant
  size?: InputSize
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  unstyled?: boolean
}
