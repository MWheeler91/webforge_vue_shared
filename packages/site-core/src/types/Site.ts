// import type { ThemeColors } from './theme/ThemeColors'
import type { UiTheme } from './api/UiThemePayload'
import type { ColorTheme } from './api/ColorThemePayload'
export type Site = {
  name: string
  slug: string
  image_url: string
  public_email: string
  public_phone: string
  address_line1: string
  address_line2: string | null
  is_address_public: boolean
  city: string
  state: string
  postal_cost: string
  google_maps_embed_url: string | null
  tagline: string | null
}

// export type SiteTheme = {
//   color: ThemeColors
// }


export type Day = {
	weekday: string
	open_time: string
	close_time:string
	text: string | null
	is_closed: boolean
	is_appointment_only: boolean
	is_emergency_only: boolean
	is_after_hours: boolean
}

export type WorkHours = Day[]

export type SiteSetting ={
	value: unknown
	enabled: boolean
}

export type SiteSettingMap = Record<string,SiteSetting>

export type SocialMedia = {
	name: string
	icon: string | null
	url: string
	username: string | null
}


export type SiteAPIPayload = {
  site: Site
  color_theme: ColorTheme
  ui_theme?: UiTheme
  hours: WorkHours
  settings: SiteSettingMap
  social: SocialMedia[]
}