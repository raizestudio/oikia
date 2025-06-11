export function useApiBaseUrl(): string {
  const apiProtocol = import.meta.env.VITE_API_PROTOCOL
  const apiHost = import.meta.env.VITE_API_HOST
  const apiPort = import.meta.env.VITE_API_PORT
  const apiVersion = import.meta.env.VITE_API_VERSION

  return `${apiProtocol}://${apiHost}:${apiPort}/api/${apiVersion}`
}
