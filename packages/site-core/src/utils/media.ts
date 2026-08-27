export function mediaUrl(path: string | null): string {
    if (!path) return ''

    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path
    }

    return path.startsWith('/') ? path : `/media/${path}`
  }