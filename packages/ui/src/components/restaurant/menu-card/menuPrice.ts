import type { MenuPrice } from './MenuCard.types.ts'

/**
 * Formats a menu price for display.
 *
 * - A number is rendered as a currency string in the given ISO 4217 currency.
 * - A string is passed through verbatim, so authored values such as `"MP"`,
 *   `"Market price"`, or `"9.99 / +"` render exactly as written.
 * - `null`, `undefined`, and an empty string produce `null` (no price shown).
 */
export function formatMenuPrice(
  price: MenuPrice | null | undefined,
  currency = 'USD',
): string | null {
  if (price === null || price === undefined || price === '') return null
  if (typeof price === 'string') return price.trim() || null
  if (!Number.isFinite(price)) return null

  try {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(price)
  } catch {
    // An unknown currency code should not break rendering.
    return `$${price.toFixed(2)}`
  }
}
