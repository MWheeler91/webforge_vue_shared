export type CalendarWeekStartsOn = 0 | 1

export type CalendarDatePredicate = (date: Date) => boolean

export interface CalendarProps {
  /** Controlled selected date. `undefined` enables internal selection state. */
  modelValue?: Date | string | null
  /** Initial selected date when the component is uncontrolled. */
  defaultValue?: Date | string | null
  /** Month initially shown when no selected date is supplied. */
  defaultMonth?: Date | string
  min?: Date | string
  max?: Date | string
  disabledDates?: Date[] | string[]
  isDateDisabled?: CalendarDatePredicate
  weekStartsOn?: CalendarWeekStartsOn
  locale?: string
  showOutsideDays?: boolean
  showToday?: boolean
  disabled?: boolean
  ariaLabel?: string
}

export interface CalendarMonthChange {
  month: Date
}
