import apiClient from '../axios'

import type { PagePayload } from '../types/PagePayload'

export async function getPage(pagePath = ''): Promise<PagePayload> {
  const normalizedPath = pagePath.trim().replace(/^\/+|\/+$/g, '')
  const endpoint = normalizedPath ? `/v1/pages/${encodeURIComponent(normalizedPath)}/` : '/v1/pages/'
  const res = await apiClient.get<PagePayload>(endpoint)
  return res.data
}
