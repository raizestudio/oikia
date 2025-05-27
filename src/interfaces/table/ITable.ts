// Interfaces
import type { IUser } from '@/interfaces/users/IUser'
import type { IContinent } from '@/interfaces/geo/IContinent'
import type { ICountry } from '@/interfaces/geo/ICountry'
import type { IAdministrativeLevelOne } from '@/interfaces/geo/IAdministrativeLevelOne'
import type { IAdministrativeLevelTwo } from '@/interfaces/geo/IAdministrativeLevelTwo'
import type { ICity } from '@/interfaces/geo/ICity'
import type { IStreet } from '@/interfaces/geo/IStreet'
import type { IAddress } from '@/interfaces/geo/IAddress'

export type TableItem =
  | keyof IUser
  | keyof IContinent
  | keyof ICountry
  | keyof IAdministrativeLevelOne
  | keyof IAdministrativeLevelTwo
  | keyof ICity
  | keyof IStreet
  | keyof IAddress

export type TableData =
  | IUser
  | IContinent
  | ICountry
  | IAdministrativeLevelOne
  | IAdministrativeLevelTwo
  | ICity
  | IStreet
  | IAddress

export interface ITableField {
  key:
    | keyof IUser
    | keyof IContinent
    | keyof ICountry
    | keyof IAdministrativeLevelOne
    | keyof IAdministrativeLevelTwo
    | keyof ICity
    | keyof IStreet
    | keyof IAddress
  label: string
  type?: 'avatar' | 'text' | 'boolean' | 'date' | 'email' | 'phone'
  isSortable?: boolean
  isPrimary?: boolean
  labelKey?: string // For avatar table cell for e.g., might become keyof T[]
}
