import apiClient from '../axios'

import type { ApiEnvelope } from '../types/ApiEnvelope'


export async function getHoneyPot() {
  const res = await apiClient.get<ApiEnvelope<string>>('/site/get-honeypot/')	
  return res.data
}
