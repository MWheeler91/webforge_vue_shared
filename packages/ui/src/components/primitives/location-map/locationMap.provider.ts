import type { LocationMapLocation } from './locationMap.types'

interface LocationMapProviderAdapter {
  readonly key: string
  buildEmbedUrl(location: LocationMapLocation): string | null
}

function hasValidCoordinates(location: LocationMapLocation) {
  return (
    typeof location.latitude === 'number' &&
    Number.isFinite(location.latitude) &&
    location.latitude >= -90 &&
    location.latitude <= 90 &&
    typeof location.longitude === 'number' &&
    Number.isFinite(location.longitude) &&
    location.longitude >= -180 &&
    location.longitude <= 180
  )
}

const openStreetMapProvider: LocationMapProviderAdapter = {
  key: 'openstreetmap',
  buildEmbedUrl(location) {
    if (!hasValidCoordinates(location)) return null

    const latitude = location.latitude as number
    const longitude = location.longitude as number
    const requestedZoom =
      typeof location.zoom === 'number' && Number.isFinite(location.zoom) ? location.zoom : 12
    const zoom = Math.min(19, Math.max(1, Math.round(requestedZoom)))
    const longitudeSpan = 360 / 2 ** zoom
    const latitudeSpan = longitudeSpan / 2
    const bbox = [
      Math.max(-180, longitude - longitudeSpan),
      Math.max(-85, latitude - latitudeSpan),
      Math.min(180, longitude + longitudeSpan),
      Math.min(85, latitude + latitudeSpan),
    ].join(',')
    const query = new URLSearchParams({
      bbox,
      layer: 'mapnik',
      marker: `${latitude},${longitude}`,
    })

    return `https://www.openstreetmap.org/export/embed.html?${query.toString()}`
  },
}

// Provider choice remains internal until more than one real integration establishes a public need.
export const locationMapProvider = openStreetMapProvider
