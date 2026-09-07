export type DataDropdownLabel = string | number | Date

export interface DataDropdownOption<TItem, TLabel, TValue> {
  item: TItem
  label: TLabel
  value: TValue
  text: string
  disabled: boolean
}
