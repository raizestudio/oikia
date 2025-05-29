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

/**
 * Interface for table fields, which defines the structure of each field in a table.
 * Each field can represent a property of the data item, such as a user or geographical entity.
 * It includes properties for the key, label, type, and additional options like sorting and visibility.
 *
 * @interface ITableField
 * @property {keyof T} key - The key of the field, which corresponds to a property in the data item.
 * @property {string} label - The label to display for the field in the table header.
 * @property {string} [type] - The type of the field, which can be 'avatar', 'text', 'boolean', 'date', 'email', or 'phone'.
 * @property {boolean} [isSortable] - Indicates if the field can be sorted.
 * @property {boolean} [isPrimary] - Indicates if the field is a primary key for the table.
 * @property {string} [labelKey] - For fields like 'avatar', this can specify which property to use for the label. // todo might become keyof T[]
 */
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
  labelKey?: string
  roleKey?: string
}
