import CenteredNavbar from './centered-navbar/CenteredNavbar.vue'
import DisclosureNavbar from './disclosure-navbar/DisclosureNavbar.vue'
import MegaMenuNavbar from './mega-menu-navbar/MegaMenuNavbar.vue'
import SidebarNavigation from './sidebar-navigation/SidebarNavigation.vue'
import SplitNavbar from './split-navbar/SplitNavbar.vue'
import StandardNavbar from './standard-navbar/StandardNavbar.vue'

export const navbarRegistry = {
  'standard-navbar': StandardNavbar,
  'centered-navbar': CenteredNavbar,
  'split-navbar': SplitNavbar,
  'disclosure-navbar': DisclosureNavbar,
  'mega-menu-navbar': MegaMenuNavbar,
  'sidebar-navigation': SidebarNavigation,

  // Compatibility keys remain valid for persisted configuration.
  'ui-standard-navbar': StandardNavbar,
  'ui-centered-navbar': CenteredNavbar,
  'ui-split-navbar': SplitNavbar,
  'ui-disclosure-navbar': DisclosureNavbar,
  'ui-mega-menu-navbar': MegaMenuNavbar,
  'ui-sidebar-navigation': SidebarNavigation,
  'simple-navbar': StandardNavbar,
  'marketing-navbar': SplitNavbar,
} as const

export type NavbarTemplateKey = keyof typeof navbarRegistry

export const DEFAULT_NAVBAR_KEY: NavbarTemplateKey = 'standard-navbar'

export function resolveNavbarComponent(key: string | null | undefined) {
  if (key && key in navbarRegistry) {
    return navbarRegistry[key as NavbarTemplateKey]
  }

  return navbarRegistry[DEFAULT_NAVBAR_KEY]
}
