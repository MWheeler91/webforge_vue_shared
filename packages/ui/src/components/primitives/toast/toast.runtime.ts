import { readonly, ref } from 'vue'
import type { ToastItem, ToastOptions, ToastVariant } from './toast.types'

const toasts = ref<ToastItem[]>([])

function createId() {
  return `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function removeToast(id: string) {
  toasts.value = toasts.value.filter((toast) => toast.id !== id)
}

function addToast(variant: ToastVariant, messageOrOptions: string | ToastOptions) {
  const options: ToastOptions =
    typeof messageOrOptions === 'string' ? { message: messageOrOptions } : messageOrOptions

  const toast: ToastItem = {
    id: createId(),
    variant,
    title: options.title,
    message: options.message,
    duration: options.duration ?? 4000,
    dismissible: options.dismissible ?? true,
  }

  toasts.value = [...toasts.value, toast]

  if (toast.duration && toast.duration > 0) {
    window.setTimeout(() => {
      removeToast(toast.id)
    }, toast.duration)
  }

  return toast.id
}

export function useToast() {
  return {
    toasts: readonly(toasts),

    show: (options: ToastOptions & { variant?: ToastVariant }) => {
      return addToast(options.variant ?? 'default', options)
    },

    default: (messageOrOptions: string | ToastOptions) => {
      return addToast('default', messageOrOptions)
    },

    info: (messageOrOptions: string | ToastOptions) => {
      return addToast('info', messageOrOptions)
    },

    success: (messageOrOptions: string | ToastOptions) => {
      return addToast('success', messageOrOptions)
    },

    warning: (messageOrOptions: string | ToastOptions) => {
      return addToast('warning', messageOrOptions)
    },

    error: (messageOrOptions: string | ToastOptions) => {
      return addToast('error', messageOrOptions)
    },

    remove: removeToast,

    clear: () => {
      toasts.value = []
    },
  }
}
