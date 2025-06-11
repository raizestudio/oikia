import type { IUser } from '@/interfaces/users/IUser'

export interface ISession {
  id: string // Pk
  ip_v4: string
  ip_v6: string
  ip_type: string
  ip_class: string
  isp: string
  user_agent: string
  created_at: string
  updated_at: string

  // Relations
  // country: string // TODO: Create ICountry interface
  // administrative_level_primary: string // TODO: Create IAdministrativeLevel interface
  // administrative_level_secondary: string // TODO: Create IAdministrativeLevel interface
  // city: string // TODO: Create ICity interface
  // token: string // TODO: Create APIKeyClient interface
  user: string
}
