import AppFooter from './app-footer/AppFooter.vue'
import ColumnsFooter from './columns-footer/ColumnsFooter.vue'
import ContactFooter from './contact-footer/ContactFooter.vue'
import LegalFooter from './legal-footer/LegalFooter.vue'
import LocationFooter from './location-footer/LocationFooter.vue'
import MinimalFooter from './minimal-footer/MinimalFooter.vue'
import NewsletterFooter from './newsletter-footer/NewsletterFooter.vue'
import PromoFooter from './promo-footer/PromoFooter.vue'
import SocialFooter from './social-footer/SocialFooter.vue'

export const footerRegistry = {
  'minimal-footer': MinimalFooter,
  'columns-footer': ColumnsFooter,
  'newsletter-footer': NewsletterFooter,
  'contact-footer': ContactFooter,
  'social-footer': SocialFooter,
  'legal-footer': LegalFooter,
  'promo-footer': PromoFooter,
  'app-footer': AppFooter,
  'location-footer': LocationFooter,

  // Compatibility keys remain valid for persisted configuration.
  'ui-minimal-footer': MinimalFooter,
  'ui-columns-footer': ColumnsFooter,
  'simple-footer': MinimalFooter,
  'sitemap-footer': ColumnsFooter,
} as const

export type FooterTemplateKey = keyof typeof footerRegistry

export const DEFAULT_FOOTER_KEY: FooterTemplateKey = 'minimal-footer'

export function resolveFooterComponent(key: string | null | undefined) {
  if (key && key in footerRegistry) {
    return footerRegistry[key as FooterTemplateKey]
  }

  return footerRegistry[DEFAULT_FOOTER_KEY]
}
