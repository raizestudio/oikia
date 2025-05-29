export type IUserRole = 'superuser' | 'admin' | 'user'

export interface IUser {
  id: string
  username: string
  first_name: string
  last_name: string
  is_active: boolean
  avatar: string
  created_at: string
  updated_at: string
  is_admin: boolean
  is_superuser: boolean

  email: string
  phone_number: string
  calling_code: string
  full_phone_number: string
  role: string
}
