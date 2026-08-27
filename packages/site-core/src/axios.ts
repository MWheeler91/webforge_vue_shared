import axios, { type AxiosInstance } from 'axios'

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || ''
const SITE_KEY = (import.meta.env.VITE_SITE_KEY as string) || ''

function isFormData(data: unknown): boolean {
  return typeof FormData !== 'undefined' && data instanceof FormData
}

function buildClient(): AxiosInstance {
  const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Accept: 'application/json',
    },
    timeout: 5000,
  })

  client.interceptors.request.use((config) => {
    config.headers = config.headers ?? {}

    if (isFormData(config.data)) {
      delete (config.headers as any)['Content-Type']
      delete (config.headers as any)['content-type']
    } else if (!(config.headers as any)['Content-Type'] && !(config.headers as any)['content-type']) {
      ;(config.headers as any)['Content-Type'] = 'application/json'
    }

    if (SITE_KEY) {
      ;(config.headers as any)['X-Site-Key'] = SITE_KEY
    }

    return config
  })

  client.interceptors.response.use(
    (response) => {
      // Some API envelopes carry the application status in the JSON body,
      // even when the transport response itself is 2xx.
      return response
    },
    (error) => {

      return Promise.reject(error)
    },
  )

  return client
}

const apiClient = buildClient()

export default apiClient
