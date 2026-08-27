export type ApiEnvelope<T> = {
  status: number
  title?: string
  messages?: string[]
  data?: T
  errors?: string[] 
}
