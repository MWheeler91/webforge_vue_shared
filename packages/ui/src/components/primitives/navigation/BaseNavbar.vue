<template>
  <component :is="as" v-bind="navbarAttrs" :class="classes">
    <div class="ui-navbar__inner">
      <div v-if="$slots.brand" class="ui-navbar__brand">
        <slot name="brand" />
      </div>

      <button
        v-if="collapsible"
        type="button"
        class="ui-navbar__mobile-toggle"
        :aria-expanded="open ? 'true' : 'false'"
        :aria-controls="mobilePanelId"
        :aria-label="open ? closeLabel : openLabel"
        @click="toggleOpen"
      >
        <slot name="toggle" :open="open">
          <NavbarToggle :open="open" />
        </slot>
      </button>

      <div class="ui-navbar__desktop">
        <div v-if="$slots.nav" class="ui-navbar__nav">
          <slot name="nav" />
        </div>

        <div v-if="$slots.actions" class="ui-navbar__actions">
          <slot name="actions" />
        </div>
      </div>
    </div>

    <div v-if="collapsible" v-show="open" :id="mobilePanelId" class="ui-navbar__mobile">
      <div v-if="$slots.nav" class="ui-navbar__mobile-nav">
        <slot name="nav" />
      </div>

      <div v-if="$slots.actions" class="ui-navbar__mobile-actions">
        <slot name="actions" />
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'
import { useUiConfig } from '../../../config/ui.runtime.ts'
import NavbarToggle from './NavbarToggle.vue'
import type {
  NavbarLayout,
  NavbarPack,
  NavbarPosition,
  NavbarSize,
  NavbarVariant,
} from './navigation.types.ts'
import type { SectionWidth } from '../section/section.types.ts'

defineOptions({
  inheritAttrs: false,
})

interface Props {
  as?: string
  pack?: NavbarPack | null
  variant?: NavbarVariant
  size?: NavbarSize
  position?: NavbarPosition
  layout?: NavbarLayout
  collapsible?: boolean
  defaultOpen?: boolean
  mobilePanelId?: string
  openLabel?: string
  closeLabel?: string
  containerWidth?: SectionWidth | null
  fullWidth?: boolean
  unstyled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  as: 'nav',
  pack: undefined,
  variant: 'surface',
  size: 'md',
  position: 'static',
  layout: 'simple',
  collapsible: true,
  defaultOpen: false,
  mobilePanelId: 'ui-navbar-mobile-panel',
  openLabel: 'Open navigation menu',
  closeLabel: 'Close navigation menu',
  containerWidth: 'full',
  fullWidth: false,
  unstyled: false,
})

const emit = defineEmits<{
  open: []
  close: []
  toggle: [open: boolean]
}>()

const attrs = useAttrs()
const uiConfig = useUiConfig()

const open = ref(props.defaultOpen)

const navbarAttrs = computed(() => {
  const rest = { ...attrs }
  delete rest.class

  return rest
})

const resolvedPack = computed(() => {
  return props.pack ?? uiConfig.navbar?.pack ?? 'default'
})

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

const classes = computed(() => {
  const externalClass = attrs.class as string | undefined

  if (props.unstyled) {
    return cn('ui-navbar-unstyled', props.fullWidth && 'ui-navbar--full-width', externalClass)
  }

  return cn(
    'ui-navbar',

    `ui-navbar--pack-${resolvedPack.value}`,
    `ui-navbar--variant-${props.variant}`,
    `ui-navbar--size-${props.size}`,
    `ui-navbar--position-${props.position}`,
    `ui-navbar--layout-${props.layout}`,

    props.collapsible && 'ui-navbar--collapsible',
    open.value && 'ui-navbar--open',
    props.fullWidth && 'ui-navbar--full-width',
    `ui-navbar--width-${props.containerWidth ?? 'full'}`,

    externalClass,
  )
})

function toggleOpen() {
  open.value = !open.value

  if (open.value) {
    emit('open')
  } else {
    emit('close')
  }

  emit('toggle', open.value)
}
</script>
