import type { SharedFooterProps } from '../../../primitives/footer/footer.types'

export type ColumnsFooterLayout = 'columns' | 'compact'

export interface ColumnsFooterProps extends Omit<SharedFooterProps, 'layout'> {
  layout?: ColumnsFooterLayout | null
}
