<template>
  <div
    v-if="isVisible"
    class="ui-location-map"
    :class="[
      `ui-location-map--pack-${uiConfig.global.pack}`,
      `ui-location-map--ratio-${aspectRatio.replace(':', '-')}`,
    ]"
    role="group"
    :aria-label="accessibleTitle"
  >
    <div class="ui-location-map__frame">
      <iframe
        v-if="embedUrl"
        class="ui-location-map__embed"
        :src="embedUrl"
        :title="accessibleTitle"
        :loading="loading"
        referrerpolicy="no-referrer-when-downgrade"
      />

      <div v-else class="ui-location-map__fallback">
        <slot name="fallback" :location="location">
          <strong>{{ location.title || 'Location' }}</strong>
          <span v-if="location.address">{{ location.address }}</span>
          <span v-else>Map coordinates are unavailable.</span>
        </slot>
      </div>
    </div>

    <a
      v-if="safeDirectionsUrl"
      class="ui-location-map__directions"
      :href="safeDirectionsUrl"
      target="_blank"
      rel="noopener noreferrer"
    >
      {{ directionsLabel }}
    </a>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUiConfig } from '../../../config/ui.runtime'
import { locationMapProvider } from './locationMap.provider'
import type { LocationMapProps } from './locationMap.types'

const props = withDefaults(defineProps<LocationMapProps>(), {
  aspectRatio: '16:9',
  loading: 'lazy',
  directionsLabel: 'Get directions',
})

const uiConfig = useUiConfig()
const isVisible = computed(() => props.location.isVisible !== false)
const embedUrl = computed(() => locationMapProvider.buildEmbedUrl(props.location))
const accessibleTitle = computed(() => {
  const title = props.location.title?.trim()
  if (title) return title

  const address = props.location.address?.trim()
  return address ? `Map for ${address}` : 'Location map'
})
const safeDirectionsUrl = computed(() => {
  const value = props.location.directionsUrl?.trim()
  if (!value) return null
  return /^(?:https?:\/\/|\/(?!\/))/i.test(value) ? value : null
})
</script>
