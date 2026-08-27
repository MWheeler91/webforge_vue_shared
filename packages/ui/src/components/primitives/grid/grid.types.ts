export type UiGridGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type UiGridAlignment = 'start' | 'center' | 'end' | 'stretch'

export interface UiGridProps {
  as?: string
  minItemWidth?: number | string
  maxColumns?: number
  gap?: UiGridGap
  rowGap?: UiGridGap | null
  align?: UiGridAlignment
  justify?: UiGridAlignment
  equalHeight?: boolean
  dense?: boolean
}
