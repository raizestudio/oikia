export interface ICity {
  id: number
  name: string
  code_postal: string
  code_insee: string

  administrative_level_one?: string
  administrative_level_two?: string
}
