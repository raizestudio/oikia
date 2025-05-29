import type { IUser } from '@/interfaces/users/IUser'

export interface ISession {
  id: number // Pk
  ip: string
  user_agent: string
  latitude: number
  longitude: number
  timezone: string
  asn: string
  a_s: string
  is_proxy: boolean
  is_vpn: boolean
  created_at: string
  updated_at: string

  // Relations
  // country: string // TODO: Create ICountry interface
  // administrative_level_primary: string // TODO: Create IAdministrativeLevel interface
  // administrative_level_secondary: string // TODO: Create IAdministrativeLevel interface
  // city: string // TODO: Create ICity interface
  // token: string // TODO: Create APIKeyClient interface
  user: IUser
}
