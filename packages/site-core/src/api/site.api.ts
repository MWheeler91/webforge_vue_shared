import apiClient from '../axios'

import type { ApiEnvelope } from '../types/ApiEnvelope'
import type { SiteAPIPayload } from '../types/Site'
import type { SiteBootstrapPayload } from '../types/SiteBootstrap'

export async function getSiteBootstrap(): Promise<ApiEnvelope<SiteBootstrapPayload>> {
  const res = await apiClient.get<ApiEnvelope<SiteBootstrapPayload>>('/site/get-site/')
  return res.data
}