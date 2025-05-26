/**
 * Interface representing a menu item.
 * @interface IMenu
 * @property {number} id - Unique identifier for the menu item.
 * @property {string} name - Name of the menu item.
 * @property {string} path - Path associated with the menu item.
 * @property {string} description - Description of the menu item.
 * @property {number | null} parent_id - Parent menu item, can be an IMenu object, a number (ID), or null if it has no parent.
 */
export interface IMenu {
  id: number
  name: string
  path: string
  icon: string
  description: string
  parent_id: number | null
}

export interface IMenuWithChildren extends IMenu {
  children: IMenuWithChildren[]
}
