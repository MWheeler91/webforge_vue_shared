<template>
  <header :class="classes">
    <div v-if="eyebrow || $slots.eyebrow" class="ui-section-header__eyebrow">
      <slot name="eyebrow">
        {{ eyebrow }}
      </slot>
    </div>

    <component
      :is="titleAs"
      v-if="title || $slots.title"
      :class="titleClasses"
      :style="titleStyles"
    >
      <slot name="title">
        {{ title }}
      </slot>
    </component>

    <p v-if="subtitle || $slots.subtitle" class="ui-section-header__subtitle">
      <slot name="subtitle">
        {{ subtitle }}
      </slot>
    </p>

    <slot />
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUiConfig } from '../../../config/ui.runtime'
import type { SectionAlign, SectionTitleAs, SectionTitleEmphasis, SectionTitleWrap } from './section.types'

interface Props {
  eyebrow?: string
  title?: string
  subtitle?: string
  align?: 'inherit' | SectionAlign
  titleAs?: SectionTitleAs
  emphasis?: SectionTitleEmphasis
  titleWrap?: SectionTitleWrap
}

const props = withDefaults(defineProps<Props>(), {
  eyebrow: '',
  title: '',
  subtitle: '',
  align: 'inherit',
  titleAs: 'h2',
  emphasis: 'standard',
  titleWrap: 'inherit',
})
const uiConfig = useUiConfig()

function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

const classes = computed(() => {
  const section = uiConfig.section

  return cn(
    'ui-section-header',
    `ui-section-header--pack-${section.pack}`,
    `ui-section-header--density-${section.density}`,
    props.align !== 'inherit' && `ui-section-header--align-${props.align}`,
  )
})

const titleClasses = computed(() =>
  cn('ui-section-header__title', `ui-section-header__title--emphasis-${props.emphasis}`),
)

// An explicit prop overrides the active UI pack; inherit leaves the pack in control.
const titleStyles = computed(() =>
  props.titleWrap === 'inherit' ? undefined : { '--section-title-wrap': props.titleWrap },
)
</script>
