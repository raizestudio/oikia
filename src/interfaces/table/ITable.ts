// Interfaces
import type { IUser } from '@/interfaces/users/IUser'
import type { IContinent } from '@/interfaces/geo/IContinent'
import type { ICountry } from '@/interfaces/geo/ICountry'
import type { ICity } from '@/interfaces/geo/ICity'

export type TableItem = keyof IUser | keyof IContinent

export type TableData = IUser | IContinent | ICountry | ICity

export interface ITableField {
  key: keyof IUser | keyof IContinent | keyof ICountry | keyof ICity
  label: string
  type?: 'text' | 'boolean' | 'date'
}
