import type { ApiEnvelope } from './ApiEnvelope'

export interface ContactFormData {
  name: string
  phone_number: string
  email: string
  msg: string
  honeypot: string
}


export type HoneyPotField = ApiEnvelope<string>
