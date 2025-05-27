<script setup lang="ts">
const props = defineProps<{
  value: string
}>()
</script>

<template>
  <div>
    <span class="text-nowrap">
      {{
        new Date(props.value).toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      }}
    </span>
  </div>
</template>
