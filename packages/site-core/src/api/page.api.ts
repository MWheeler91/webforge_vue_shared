import apiClient from '../axios'

import type { PagePayload } from '../types/PagePayload'

export async function getPage(): Promise<PagePayload> {
  const res = await apiClient.get<PagePayload>('/v1/pages/')
  return res.data
}
