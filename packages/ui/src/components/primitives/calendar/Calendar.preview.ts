import type { CalendarProps } from './calendar.types'

export const calendarPreview: CalendarProps = {
  defaultValue: new Date(2026, 6, 24),
  weekStartsOn: 0,
  showOutsideDays: true,
}

/** Calendar inherits its outer treatment through BaseCard. */
export const calendarPackPreview = { packs: ['default', 'glass'] as const }
