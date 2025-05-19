<script lang="ts" setup>
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

const dropdown = ref<HTMLElement | null>(null)

const closeDropdown = () => {
  dropdown.value?.attributes.removeNamedItem('open')
}

onClickOutside(dropdown, closeDropdown)
</script>

<template>
  <details class="dropdown dropdown-center" ref="dropdown">
    <summary class="btn btn-sm">
      <slot name="trigger" />
    </summary>
    <div class="menu dropdown-content bg-base-100 rounded-box z-1 w-auto p-2 shadow-sm">
      <slot name="content" />
    </div>
  </details>
</template>
