<template>
  <BaseSection
    :id="section.key ?? undefined"
    :class="sectionClasses"
    :variant="variant"
    spacing="xl"
    width="full"
  >
    <BaseContainer width="xl" padding="lg">
      <div class="cta-section__panel">
        <div class="cta-section__inner">
          <SectionHeader
            v-if="eyebrow || title || body"
            class="cta-section__header !mb-0"
            :eyebrow="eyebrow?.text ?? undefined"
            :subtitle="body?.text ?? undefined"
          >
            <template v-if="title" #title>{{ title.text }}</template>
          </SectionHeader>

          <div v-if="buttons.length" class="cta-section__actions">
            <BaseButton v-for="button in buttons" :key="button.label" v-bind="button">
              {{ button.label }}
            </BaseButton>
          </div>
        </div>
      </div>
    </BaseContainer>
  </BaseSection>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { BaseButton, BaseContainer, BaseSection, SectionHeader } from '../../../primitives/index.ts'
import { sectionElement } from '../sectionData.ts'
import type { CardAction } from '../../../primitives/card/card.types.ts'
import type { CtaSectionProps } from './CtaSection.types.ts'

const props = withDefaults(defineProps<CtaSectionProps>(), {
  layout: 'banner',
  variant: 'default',
})

const eyebrow = computed(() => sectionElement(props.section, 'eyebrow'))
const title = computed(() => sectionElement(props.section, 'title'))
const body = computed(() => sectionElement(props.section, 'body'))

const buttons = computed<CardAction[]>(() => {
  const values = props.section.elements?.buttons as Record<string, Array<Record<string, unknown>>> | undefined
  return Object.values(values ?? {})
    .flat()
    .map((button) => ({
      label: String(button.text ?? button.label ?? ''),
      href: button.href as string | undefined,
      to: button.vue_route as string | undefined,
      variant: button.variant as CardAction['variant'] | undefined,
      size: 'lg' as const,
    }))
    .filter((button) => button.label)
})

const sectionClasses = computed(() => ['cta-section', `cta-section--layout-${props.layout}`])
</script>

<style scoped>
.cta-section__inner {
  display: grid;
  gap: 1.25rem;
  align-items: center;
  min-width: 0;
}

.cta-section__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

/* banner ----------------------------------------------------------------- */
@media (min-width: 700px) {
  .cta-section--layout-banner .cta-section__inner {
    grid-template-columns: minmax(0, 1fr) auto;
  }
  .cta-section--layout-banner .cta-section__actions {
    justify-content: flex-end;
  }
}

/* centered -------------------------------------------------------------------- */
.cta-section--layout-centered .cta-section__inner {
  justify-items: center;
  text-align: center;
  max-width: 46rem;
  margin-inline: auto;
}
.cta-section--layout-centered .cta-section__header {
  margin-inline: auto;
}
.cta-section--layout-centered .cta-section__actions {
  justify-content: center;
}

/* panel -------------------------------------------------------------------- */
.cta-section--layout-panel .cta-section__panel {
  max-width: 60rem;
  margin-inline: auto;
  padding: clamp(1.75rem, 4vw, 3rem);
  border: 1px solid var(--ui-current-border);
  border-radius: 1rem;
}
.cta-section--layout-panel .cta-section__inner {
  justify-items: center;
  text-align: center;
}
.cta-section--layout-panel .cta-section__header {
  margin-inline: auto;
}
.cta-section--layout-panel .cta-section__actions {
  justify-content: center;
}
</style>
