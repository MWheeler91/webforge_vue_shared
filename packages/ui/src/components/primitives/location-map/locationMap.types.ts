export type LocationMapAspectRatio = 'square' | '4:3' | '3:2' | '16:9' | 'wide'

export type LocationMapLoading = 'lazy' | 'eager'

export interface LocationMapLocation {
  isVisible?: boolean
  latitude?: number | null
  longitude?: number | null
  address?: string
  zoom?: number
  directionsUrl?: string
  title?: string
}

export interface LocationMapProps {
  location: LocationMapLocation
  aspectRatio?: LocationMapAspectRatio
  loading?: LocationMapLoading
  directionsLabel?: string
}
