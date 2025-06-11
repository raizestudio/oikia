// Interfaces
import type { IUser } from '@/interfaces/users/IUser'

export interface IAuth {
  token: string | null
  refresh: string | null
  user: IUser | null
}
