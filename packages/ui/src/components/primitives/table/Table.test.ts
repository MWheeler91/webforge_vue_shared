import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import BaseTable from './BaseTable.vue'
import TableCell from './TableCell.vue'

describe('Table', () => {
  it('renders semantic heading cells with alignment', () => {
    const wrapper = mount({
      components: { BaseTable, TableCell },
      template:
        '<BaseTable><thead><tr><TableCell header align="right">Total</TableCell></tr></thead></BaseTable>',
    })
    expect(wrapper.get('th').attributes('scope')).toBe('col')
    expect(wrapper.get('th').classes()).toContain('ui-table__cell--right')
  })
})
