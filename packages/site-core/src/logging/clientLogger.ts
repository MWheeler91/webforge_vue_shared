import axios from 'axios'

import apiClient from '../axios'

type LogLevel = 'error' | 'warning'

export type ClientLogContext = Record<string, unknown>

export type ClientLogEvent = {
  level: LogLevel
  source: string
  message: string
  name?: string
  stack?: string
  route?: string
  client_timestamp: string
  context?: ClientLogContext
}

const CLIENT_ERROR_URL =
  (import.meta.env.VITE_CLIENT_ERROR_URL as string | undefined) || '/logging/client-error/'

const MAX_REPORTS = 10
const reportedFingerprints = new Set<string>()

function getRoute(): string | undefined {
  if (typeof window === 'undefined') return undefined
  return `${window.location.pathname}${window.location.hash}`
}

function normalizeError(error: unknown): Pick<ClientLogEvent, 'message' | 'name' | 'stack'> {
  if (error instanceof Error) {
    return {
      message: error.message || 'Unknown client error',
      name: error.name,
      stack: error.stack,
    }
  }

  if (axios.isAxiosError(error)) {
    return {
      message: error.message || `API request failed with status ${error.response?.status ?? 'unknown'}`,
      name: 'AxiosError',
      stack: error.stack,
    }
  }

  if (typeof error === 'string') return { message: error }

  try {
    return { message: JSON.stringify(error) }
  } catch {
    return { message: 'Unknown client error' }
  }
}

function fingerprint(event: ClientLogEvent): string {
  return `${event.level}:${event.source}:${event.message}:${JSON.stringify(event.context ?? {})}`
}

function canReport(event: ClientLogEvent): boolean {
  if (reportedFingerprints.size >= MAX_REPORTS) return false

  const key = fingerprint(event)
  if (reportedFingerprints.has(key)) return false

  reportedFingerprints.add(key)
  return true
}

async function report(level: LogLevel, error: unknown, source: string, context?: ClientLogContext) {
  const normalized = normalizeError(error)
  const event: ClientLogEvent = {
    level,
    source,
    ...normalized,
    route: getRoute(),
    client_timestamp: new Date().toISOString(),
    context,
  }

  if (!canReport(event)) return

  try {
    await apiClient.post(CLIENT_ERROR_URL, event, {
      // Prevent a future response interceptor from reporting this request again.
      headers: { 'X-Skip-Client-Error-Logging': 'true' },
    })
  } catch {
    // Error reporting must never create a second application error.
  }
}

export function reportClientError(error: unknown, source = 'frontend', context?: ClientLogContext) {
  return report('error', error, source, context)
}

export function reportClientWarning(message: string, source = 'frontend', context?: ClientLogContext) {
  return report('warning', message, source, context)
}
