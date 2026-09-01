import apiClient from '../axios'
import type { ApiEnvelope } from '../types/ApiEnvelope'

export type ContactSubmission = {
  name: string
  business: string
  phone_number: string
  email: string
  msg: string
  honeypot: string
}

export async function submitContactForm(
  form: ContactSubmission,
): Promise<ApiEnvelope<null>> {
  const response = await apiClient.post<ApiEnvelope<null>>('/v1/contact/', form, {
    // Let the component read Django's error envelope for 4xx responses.
    validateStatus: () => true,
  })
  return response.data
}
