import { ref } from 'vue'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface Toast {
  id: number
  type: ToastType
  title: string
  message: string
  timeout?: number
}

const toasts = ref<Toast[]>([])
let toastSeq = 1

// Simple guard to prevent rapid duplicate spam (e.g., repeated API failures)
let lastToastKey: string | null = null
let lastToastResetTimer: number | null = null

function afterPaint(cb: () => void) {
  requestAnimationFrame(() => requestAnimationFrame(cb))
}

function makeKey(type: ToastType, title: string, message: string) {
  return `${type}:${title}:${message}`
}

export const toastHelper = {
  send: sendToast,
}

export function showToast(type: ToastType, title: string, message: string, timeout = 3000) {
  const key = makeKey(type, title, message)

  // block identical toast fired repeatedly in a short window
  if (key === lastToastKey) return
  lastToastKey = key

  if (lastToastResetTimer) window.clearTimeout(lastToastResetTimer)
  lastToastResetTimer = window.setTimeout(() => {
    lastToastKey = null
    lastToastResetTimer = null
  }, 1000)

  afterPaint(() => {
    const id = toastSeq++
    const toast: Toast = { id, type, title, message, timeout }
    toasts.value.push(toast)

    if (timeout > 0) {
      window.setTimeout(() => dismissToast(id), timeout)
    }
  })
}

export function dismissToast(id: number) {
  const idx = toasts.value.findIndex((t) => t.id === id)
  if (idx !== -1) toasts.value.splice(idx, 1)
}

export function clearToasts() {
  toasts.value.splice(0, toasts.value.length)
}

export function useToasts() {
  return { toasts, dismissToast, clearToasts }
}

// Optional ergonomic helpers
export const toast = {
  success: (title: string, message: string, timeout?: number) =>
    showToast('success', title, message, timeout),
  error: (title: string, message: string, timeout?: number) =>
    showToast('error', title, message, timeout),
  info: (title: string, message: string, timeout?: number) =>
    showToast('info', title, message, timeout),
  warning: (title: string, message: string, timeout?: number) =>
    showToast('warning', title, message, timeout),
} as const

function sendToast(status: number = 0, header?: string, msg?: string[]) {
  let type: ToastType = 'info'
  let title = header ?? ''
  let message = msg ?? ''

  // ---- Custom App Status Codes (0,1,2) ----
  if (status === 0) {
    type = 'success'
    title ||= 'Success'
    message ||= 'Operation completed successfully.'
  } else if (status === 1) {
    type = 'warning'
    title ||= 'Warning'
    message ||= 'Please review the information provided.'
  } else if (status === 2) {
    type = 'error'
    title ||= 'Error'
    message ||= 'Something went wrong.'
  }

  // ---- HTTP Status Codes ----
  else if (status >= 200 && status < 300) {
    type = 'success'
    title ||= 'Success'
    message ||= 'Request completed successfully.'
  } else if (status === 400) {
    type = 'error'
    title ||= 'Invalid request'
    message ||= 'Please review your input and try again.'
  } else if (status === 401 || status === 403) {
    type = 'error'
    title ||= 'Unauthorized'
    message ||= 'You do not have permission to perform this action.'
  } else if (status === 404) {
    type = 'error'
    title ||= 'Not found'
    message ||= 'The requested resource could not be found.'
  } else if (status === 429) {
    type = 'warning'
    title ||= 'Too many requests'
    message ||= 'Please wait a moment and try again.'
  } else if (status >= 500) {
    type = 'error'
    title ||= 'Server error'
    message ||= 'Something went wrong on our end. Please try again later.'
  } else {
    type = 'error'
    title ||= 'Network error'
    message ||= 'Unable to complete the request. Please check your connection.'
  }

  // showToast(type, title, message)
}
