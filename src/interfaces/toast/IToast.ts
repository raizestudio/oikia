export type ToastVariant = 'success' | 'error' | 'info' | 'warning' | null

export interface IToast {
  id: string
  message: string
  title?: string
  variant?: ToastVariant
  duration?: number | null
  isClosable?: boolean
  isAlert?: boolean
}
