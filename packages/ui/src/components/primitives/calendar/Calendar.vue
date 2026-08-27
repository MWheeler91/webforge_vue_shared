<template>
  <BaseCard class="ui-calendar" padding="sm">
    <div class="ui-calendar__header">
      <BaseButton
        variant="ghost"
        icon-only
        :disabled="disabled"
        :aria-label="previousMonthLabel"
        @click="moveMonth(-1)"
      >
        <span aria-hidden="true">‹</span>
      </BaseButton>

      <h2 class="ui-calendar__heading" aria-live="polite">{{ monthLabel }}</h2>

      <BaseButton
        variant="ghost"
        icon-only
        :disabled="disabled"
        :aria-label="nextMonthLabel"
        @click="moveMonth(1)"
      >
        <span aria-hidden="true">›</span>
      </BaseButton>
    </div>

    <div class="ui-calendar__toolbar">
      <BaseButton
        v-if="showToday"
        size="sm"
        variant="secondary"
        :disabled="disabled"
        @click="selectToday"
      >
        Today
      </BaseButton>
      <slot name="actions" :month="monthStart" :select-today="selectToday" />
    </div>

    <div class="ui-calendar__grid" role="grid" :aria-label="ariaLabel">
      <div
        v-for="weekday in weekdays"
        :key="weekday.long"
        class="ui-calendar__weekday"
        :title="weekday.long"
      >
        <span aria-hidden="true">{{ weekday.short }}</span>
        <span class="ui-calendar__sr-only">{{ weekday.long }}</span>
      </div>

      <button
        v-for="day in days"
        :key="day.key"
        ref="dayButtons"
        class="ui-calendar__day"
        :class="{
          'ui-calendar__day--outside': !day.inCurrentMonth,
          'ui-calendar__day--today': day.isToday,
          'ui-calendar__day--selected': day.isSelected,
          'ui-calendar__day--disabled': day.isDisabled,
        }"
        type="button"
        role="gridcell"
        :aria-label="day.label"
        :aria-selected="day.isSelected"
        :aria-current="day.isToday ? 'date' : undefined"
        :disabled="day.isDisabled || disabled"
        :tabindex="day.isFocusTarget ? 0 : -1"
        :data-date="day.iso"
        @click="selectDate(day.date)"
        @keydown="onDayKeydown($event, day.date)"
      >
        <time :datetime="day.iso">{{ day.date.getDate() }}</time>
      </button>
    </div>
  </BaseCard>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import BaseButton from '../button/BaseButton.vue'
import BaseCard from '../card/BaseCard.vue'
import type { CalendarProps } from './calendar.types.ts'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<CalendarProps>(), {
  modelValue: undefined,
  defaultValue: null,
  defaultMonth: undefined,
  min: undefined,
  max: undefined,
  disabledDates: () => [],
  isDateDisabled: undefined,
  weekStartsOn: 0,
  locale: undefined,
  showOutsideDays: true,
  showToday: true,
  disabled: false,
  ariaLabel: 'Calendar',
})

const emit = defineEmits<{
  'update:modelValue': [value: Date | null]
  change: [value: Date | null]
  'month-change': [month: Date]
}>()

const dayButtons = ref<HTMLButtonElement[]>([])
const today = startOfDay(new Date())
const controlledValue = computed(() => toDate(props.modelValue))
const internalValue = ref<Date | null>(toDate(props.defaultValue))
const selectedValue = computed(() => controlledValue.value ?? internalValue.value)
const initialMonth = toDate(props.defaultMonth) ?? selectedValue.value ?? today
const monthStart = ref(startOfMonth(initialMonth))

watch(controlledValue, (value) => {
  if (value) monthStart.value = startOfMonth(value)
})

const dateFormatter = computed(
  () =>
    new Intl.DateTimeFormat(props.locale, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }),
)
const monthFormatter = computed(
  () => new Intl.DateTimeFormat(props.locale, { month: 'long', year: 'numeric' }),
)
const weekdayFormatter = computed(() => new Intl.DateTimeFormat(props.locale, { weekday: 'short' }))
const weekdayLongFormatter = computed(
  () => new Intl.DateTimeFormat(props.locale, { weekday: 'long' }),
)
const monthLabel = computed(() => monthFormatter.value.format(monthStart.value))
const previousMonthLabel = computed(
  () => `Show ${monthFormatter.value.format(addMonths(monthStart.value, -1))}`,
)
const nextMonthLabel = computed(
  () => `Show ${monthFormatter.value.format(addMonths(monthStart.value, 1))}`,
)

const weekdays = computed(() => {
  const sunday = new Date(2023, 0, 1)
  return Array.from({ length: 7 }, (_, index) => {
    const offset = (index + props.weekStartsOn) % 7
    const date = addDays(sunday, offset)
    return {
      short: weekdayFormatter.value.format(date),
      long: weekdayLongFormatter.value.format(date),
    }
  })
})

const disabledKeys = computed(
  () => new Set(props.disabledDates.map(toDate).filter(isDate).map(dateKey)),
)
const days = computed(() => {
  const first = monthStart.value
  const leadingDays = (first.getDay() - props.weekStartsOn + 7) % 7
  const firstGridDate = addDays(first, -leadingDays)
  const totalDays = 42

  return Array.from({ length: totalDays }, (_, index) => {
    const date = addDays(firstGridDate, index)
    const inCurrentMonth = date.getMonth() === first.getMonth()
    const isDisabled = !inCurrentMonth && !props.showOutsideDays ? true : isUnavailable(date)
    const isSelected = sameDay(date, selectedValue.value)
    return {
      date,
      iso: toIsoDate(date),
      key: dateKey(date),
      inCurrentMonth,
      isDisabled,
      isSelected,
      isToday: sameDay(date, today),
      isFocusTarget: isSelected || (!selectedValue.value && sameDay(date, today)),
      label: `${dateFormatter.value.format(date)}${isSelected ? ', selected' : ''}${isDisabled ? ', unavailable' : ''}`,
    }
  })
})

function isUnavailable(date: Date) {
  const min = toDate(props.min)
  const max = toDate(props.max)
  return Boolean(
    (min && date < min) ||
    (max && date > max) ||
    disabledKeys.value.has(dateKey(date)) ||
    props.isDateDisabled?.(date),
  )
}

function selectDate(date: Date) {
  if (props.disabled || isUnavailable(date)) return
  const value = startOfDay(date)
  if (controlledValue.value === undefined) internalValue.value = value
  emit('update:modelValue', value)
  emit('change', value)
  if (
    date.getMonth() !== monthStart.value.getMonth() ||
    date.getFullYear() !== monthStart.value.getFullYear()
  ) {
    setMonth(value)
  }
}

function selectToday() {
  if (!isUnavailable(today)) selectDate(today)
}

function moveMonth(amount: number) {
  setMonth(addMonths(monthStart.value, amount))
}

function setMonth(date: Date) {
  monthStart.value = startOfMonth(date)
  emit('month-change', new Date(monthStart.value))
}

async function onDayKeydown(event: KeyboardEvent, date: Date) {
  const movement: Record<string, number> = {
    ArrowLeft: -1,
    ArrowRight: 1,
    ArrowUp: -7,
    ArrowDown: 7,
  }
  const daysToMove = movement[event.key]
  if (daysToMove !== undefined) {
    event.preventDefault()
    await focusDate(addDays(date, daysToMove))
  } else if (event.key === 'Home') {
    event.preventDefault()
    await focusDate(addDays(date, -((date.getDay() - props.weekStartsOn + 7) % 7)))
  } else if (event.key === 'End') {
    event.preventDefault()
    await focusDate(addDays(date, 6 - ((date.getDay() - props.weekStartsOn + 7) % 7)))
  } else if (event.key === 'PageUp' || event.key === 'PageDown') {
    event.preventDefault()
    await focusDate(addMonths(date, event.key === 'PageUp' ? -1 : 1))
  }
}

async function focusDate(date: Date) {
  if (
    date.getMonth() !== monthStart.value.getMonth() ||
    date.getFullYear() !== monthStart.value.getFullYear()
  )
    setMonth(date)
  await nextTick()
  const button = dayButtons.value.find((element) => element?.dataset.date === toIsoDate(date))
  button?.focus()
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}
function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}
function addDays(date: Date, amount: number) {
  const result = new Date(date)
  result.setDate(result.getDate() + amount)
  return startOfDay(result)
}
function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1)
}
function sameDay(a: Date | null, b: Date | null) {
  return Boolean(
    a &&
    b &&
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate(),
  )
}
function toDate(value: Date | string | null | undefined) {
  if (!value) return null
  const date = value instanceof Date ? value : new Date(`${value}T00:00:00`)
  return Number.isNaN(date.getTime()) ? null : startOfDay(date)
}
function isDate(value: Date | null): value is Date {
  return value !== null
}
function dateKey(date: Date) {
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}
function toIsoDate(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}
</script>
