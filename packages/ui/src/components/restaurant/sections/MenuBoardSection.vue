<template>
  <BaseSection class="ui-menu-board-section" :variant="props.variant" spacing="xl" width="full">
    <BaseContainer width="xl" padding="lg" center>
      <SectionHeader
        v-if="hasHeading"
        class="ui-menu-board-section__header"
        :eyebrow="props.heading?.eyebrow ?? undefined"
        :title="props.heading?.title ?? undefined"
        :subtitle="props.heading?.body ?? undefined"
        title-as="h2"
        align="center"
      />

      <div class="ui-menu-board-section__blocks">
        <section
          v-for="(block, blockIndex) in blocks"
          :key="blockIndex"
          class="ui-menu-board-section__block"
          :class="`ui-menu-board-section__block--${block.kind}`"
          :data-menu-board-block="block.kind"
        >
          <!-- Card grid: one category, centred heading, responsive card grid. -->
          <template v-if="block.kind === 'grid'">
            <header class="ui-menu-board-section__block-head">
              <h3 class="ui-menu-board-section__block-title">{{ block.categories[0]!.label }}</h3>
              <p v-if="block.categories[0]!.subline" class="ui-menu-board-section__subline">
                {{ block.categories[0]!.subline }}
              </p>
            </header>
            <div class="ui-menu-board-section__grid">
              <MenuCard
                v-for="(item, index) in block.categories[0]!.items"
                :key="index"
                :item="item"
                :layout="props.gridItemLayout"
                :variant="gridCardVariant"
                :currency="props.currency"
              />
            </div>
          </template>

          <!-- Text lists: one or more categories laid out side by side. -->
          <div v-else class="ui-menu-board-section__lists">
            <div
              v-for="category in block.categories"
              :key="category.key"
              class="ui-menu-board-section__list-column"
            >
              <header class="ui-menu-board-section__block-head">
                <h3 class="ui-menu-board-section__block-title">{{ category.label }}</h3>
                <p v-if="category.subline" class="ui-menu-board-section__subline">
                  {{ category.subline }}
                </p>
              </header>
              <ul class="ui-menu-board-section__list">
                <li
                  v-for="(item, index) in category.items"
                  :key="index"
                  class="ui-menu-board-section__list-item"
                >
                  <MenuCard
                    :item="item"
                    :layout="props.listItemLayout"
                    :variant="listCardVariant"
                    :currency="props.currency"
                    padding="none"
                  />
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>

      <p v-if="props.menu?.footnote" class="ui-menu-board-section__footnote">
        {{ props.menu.footnote }}
      </p>
    </BaseContainer>
  </BaseSection>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import BaseContainer from '../../primitives/container/BaseContainer.vue'
import BaseSection from '../../primitives/section/BaseSection.vue'
import SectionHeader from '../../primitives/section/SectionHeader.vue'
import MenuCard from '../menu-card/MenuCard.vue'
import type { CardVariant, MenuBoardSectionProps, MenuCategoryGroup } from '../restaurant.types.ts'

const props = withDefaults(defineProps<MenuBoardSectionProps>(), {
  defaultPresentation: 'grid',
  gridItemLayout: 'inline',
  listItemLayout: 'inline',
  variant: 'default',
  currency: 'USD',
})

// The page API supplies `cardVariant`; without it grid cards get chrome and the
// side-by-side drink lists stay flat.
const gridCardVariant = computed<CardVariant>(() => props.cardVariant ?? 'surface')
const listCardVariant = computed<CardVariant>(() => props.cardVariant ?? 'ghost')

const hasHeading = computed(
  () => Boolean(props.heading?.eyebrow || props.heading?.title || props.heading?.body),
)

interface Block {
  kind: 'grid' | 'list'
  categories: MenuCategoryGroup[]
}

// Consecutive `list` categories collapse into one side-by-side block; a `grid`
// category is always its own block.
const blocks = computed<Block[]>(() => {
  const out: Block[] = []
  for (const category of props.menu?.categories ?? []) {
    const kind = category.presentation ?? props.defaultPresentation
    const last = out[out.length - 1]
    if (kind === 'list' && last?.kind === 'list') {
      last.categories.push(category)
    } else {
      out.push({ kind, categories: [category] })
    }
  }
  return out
})
</script>

<style scoped>
.ui-menu-board-section__header {
  margin-bottom: 2.5rem;
}

.ui-menu-board-section__blocks {
  display: grid;
  gap: 3.5rem;
}

.ui-menu-board-section__block-head {
  text-align: center;
  margin-bottom: 1.5rem;
}

.ui-menu-board-section__block-title {
  margin: 0;
  font-family: var(--font-display);
  font-size: var(--type-heading-sm-size);
  line-height: var(--type-heading-sm-line);
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.ui-menu-board-section__subline {
  margin: 0.25rem 0 0;
  color: var(--ui-current-text-secondary);
  font-size: var(--type-body-small-size);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.ui-menu-board-section__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(16rem, 1fr));
  gap: 1rem 1.5rem;
  align-items: stretch;
}

.ui-menu-board-section__lists {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
  gap: 2.5rem 3rem;
}

.ui-menu-board-section__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.ui-menu-board-section__list-item {
  padding-block: 0.75rem;
  border-top: 1px solid var(--border_default);
}

.ui-menu-board-section__footnote {
  margin: 2.5rem 0 0;
  text-align: center;
  color: var(--ui-current-text-secondary);
  font-size: var(--type-body-small-size);
  line-height: 1.7;
}
</style>
