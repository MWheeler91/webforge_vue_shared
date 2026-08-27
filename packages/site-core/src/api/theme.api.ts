import apiClient from '../axios'

import type { ApiEnvelope } from '../types/ApiEnvelope'
import type { SavedColorThemePayload } from '../types/api/ColorThemePayload'

export async function getColorThemes(): Promise<ApiEnvelope<SavedColorThemePayload>> {
  const res = await apiClient.get<ApiEnvelope<SavedColorThemePayload>>('/theme/get-color-themes/')
  return res.data
}