import apiClient from '../axios'

import type { ApiEnvelope } from '../types/ApiEnvelope'
import type { SavedColorThemePayload } from '../types/api/ColorThemePayload'

export type PlaygroundOption = {
  name: string
  key: string
  is_default: boolean
}

export type PlaygroundOptionsPayload = {
  themes: SavedColorThemePayload
  pack: PlaygroundOption[]
  radius: PlaygroundOption[]
  density: PlaygroundOption[]
  font: PlaygroundOption[]
  typography: PlaygroundOption[]
}

export async function getPlaygroundOptions(): Promise<ApiEnvelope<PlaygroundOptionsPayload>> {
  const res = await apiClient.get<ApiEnvelope<PlaygroundOptionsPayload>>('/pages/playground/')
  return res.data
}

