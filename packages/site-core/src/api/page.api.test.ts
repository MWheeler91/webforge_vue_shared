import { describe, expect, it, vi } from 'vitest'

import apiClient from '../axios'
import { getPage } from './page.api'

vi.mock('../axios', () => ({
  default: { get: vi.fn() },
}))

describe('getPage', () => {
  it('loads the home page endpoint by default', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({ data: { status: 200 } })

    await getPage()

    expect(apiClient.get).toHaveBeenCalledWith('/v1/pages/')
  })

  it('loads a named page endpoint', async () => {
    vi.mocked(apiClient.get).mockResolvedValueOnce({ data: { status: 200 } })

    await getPage('/about/')

    expect(apiClient.get).toHaveBeenCalledWith('/v1/pages/about/')
  })
})
