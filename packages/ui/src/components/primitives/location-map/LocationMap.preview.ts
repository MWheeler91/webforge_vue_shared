import type { LocationMapProps } from './locationMap.types'

export interface LocationMapPreviewCase {
  key: string
  label: string
  props: LocationMapProps
}

const office = {
  latitude: 36.1627,
  longitude: -86.7816,
  address: 'Nashville, Tennessee',
  zoom: 12,
  title: 'Nashville office',
}

export const locationMapPreview: LocationMapPreviewCase[] = [
  { key: 'standard', label: 'Standard map', props: { location: office } },
  {
    key: 'hidden',
    label: 'Hidden map',
    props: { location: { ...office, isVisible: false } },
  },
  {
    key: 'minimal',
    label: 'Missing optional fields',
    props: { location: { latitude: office.latitude, longitude: office.longitude } },
  },
  {
    key: 'directions',
    label: 'Directions link',
    props: {
      location: { ...office, directionsUrl: 'https://www.openstreetmap.org/directions' },
    },
  },
  { key: 'square', label: 'Square map', props: { location: office, aspectRatio: 'square' } },
  { key: 'wide', label: 'Wide map', props: { location: office, aspectRatio: 'wide' } },
]

export const locationMapPackPreview = { packs: ['default', 'glass', 'block'] as const }
