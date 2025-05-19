export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $capitalize: (word: string) => string
  }
}