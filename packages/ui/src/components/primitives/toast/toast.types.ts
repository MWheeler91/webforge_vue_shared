import type { UiPack } from '../../../config/ui.types'

export type ToastPack = UiPack

export type ToastVariant = 'default' | 'info' | 'success' | 'warning' | 'error'

export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

export interface ToastItem {
  id: string
  variant: ToastVariant
  title?: string
  message?: string
  duration?: number
  dismissible?: boolean
}

export interface ToastOptions {
  title?: string
  message?: string
  duration?: number
  dismissible?: boolean
}

export interface ToastViewportConfig {
  pack?: ToastPack | null
  position?: ToastPosition
}
