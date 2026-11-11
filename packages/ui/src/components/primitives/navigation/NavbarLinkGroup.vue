<template>
  <div
    class="ui-navbar-link-group"
    :class="open && 'ui-navbar-link-group--open'"
    @focusout="handleFocusOut"
    @keydown.escape="close"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <NavbarLink
      v-if="isNavigable"
      :label="label"
      :href="href"
      :to="to"
      :active="active"
      :disabled="disabled"
      :external="external"
      class="ui-navbar-link-group__trigger"
    >
      {{ label }}
    </NavbarLink>
    <button
      v-else
      type="button"
      class="ui-navbar-link-group__trigger ui-navbar-link-group__trigger--label-only"
      :aria-expanded="open ? 'true' : 'false'"
      @click="toggle"
    >
      {{ label }}
    </button>

    <button
      type="button"
      class="ui-navbar-link-group__caret"
      :aria-expanded="open ? 'true' : 'false'"
      :aria-label="open ? `Close ${label} menu` : `Open ${label} menu`"
      @click="toggle"
    >
      <span class="ui-navbar-link-group__caret-icon" aria-hidden="true" />
    </button>

    <div class="ui-navbar-link-group__panel">
      <NavbarNav orientation="vertical" gap="sm">
        <NavbarLink
          v-for="(child, index) in children"
          :key="child.href ?? child.label ?? index"
          :label="child.label"
          :href="child.href"
          :to="child.to"
          :active="child.active"
          :disabled="child.disabled"
          :external="child.external"
          @click="close"
          >{{ child.label }}</NavbarLink
        >
      </NavbarNav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import NavbarLink from './NavbarLink.vue'
import NavbarNav from './NavbarNav.vue'
import type { NavbarLinkItem } from './navigation.types.ts'

interface Props {
  label: string
  href?: string
  to?: string | Record<string, unknown>
  active?: boolean
  external?: boolean
  disabled?: boolean
  children: NavbarLinkItem[]
}

const props = withDefaults(defineProps<Props>(), {
  href: undefined,
  to: undefined,
  active: false,
  external: false,
  disabled: false,
})

// A group's own item is only a real destination when it carries an href/to; otherwise it exists
// purely to host the dropdown (e.g. a "Services" label with no dedicated page of its own).
const isNavigable = computed(() => Boolean(props.href || props.to))

const open = ref(false)

// Only real pointer devices (a mouse) get hover-to-open; touch never matches this, so mobile is
// click-only and never gets a hover-triggered caret rotation or panel reveal.
const supportsHover = computed(() => {
  return typeof window !== 'undefined' && window.matchMedia?.('(hover: hover) and (pointer: fine)').matches
})

let closeTimeout: ReturnType<typeof setTimeout> | undefined

function clearCloseTimeout() {
  if (closeTimeout !== undefined) {
    clearTimeout(closeTimeout)
    closeTimeout = undefined
  }
}

function toggle() {
  clearCloseTimeout()
  open.value = !open.value
}

function close() {
  clearCloseTimeout()
  open.value = false
}

function handleMouseEnter() {
  if (!supportsHover.value) return
  clearCloseTimeout()
  open.value = true
}

function handleMouseLeave() {
  if (!supportsHover.value) return
  clearCloseTimeout()
  // A short grace period tolerates the pointer briefly leaving the trigger while moving toward
  // the panel, instead of requiring pixel-perfect diagonal movement.
  closeTimeout = setTimeout(() => {
    open.value = false
  }, 150)
}

function handleFocusOut(event: FocusEvent) {
  const next = event.relatedTarget as Node | null
  const container = event.currentTarget as Node

  if (!next || !container.contains(next)) {
    close()
  }
}
</script>
