import { getApiBaseUrl } from "../axios"

export function mediaUrl(path: string | null): string {
  if (!path) return ""

  if (/^(https?:)?\/\//.test(path) || path.startsWith("data:") || path.startsWith("blob:")) {
    return path
  }

  const normalizedPath = path.startsWith("/") ? path : `/media/${path}`
  const origin = getApiBaseUrl().trim().replace(/\/api\/?$/, "")
  return origin ? origin + normalizedPath : normalizedPath
}
