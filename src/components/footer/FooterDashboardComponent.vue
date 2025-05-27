<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
// Icons
import IconSignalFull from '@/components/icons/IconSignalFull.vue'
import IconDatabase from '@/components/icons/IconDatabase.vue'
import IconQuestionMark from '@/components/icons/IconQuestionMark.vue'

const time = ref<Date | null>(null)

const clock = computed(() => {
  if (!time.value) return ''
  return time.value.toLocaleTimeString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
})

onMounted(() => {
  time.value = new Date()
  setInterval(() => {
    time.value = new Date()
  }, 1000)
})
</script>

<template>
  <div class="h-5 flex items-center bg-base-200 px-2 border-t border-base-300">
    <div class="flex gap-4 grow">
      <div class="flex items-center gap-1">
        <IconQuestionMark class="w-4.5 h-4.5" />
        <span class="text-xs font-bold text-base-content/50">API status</span>
        <div class="w-2.5 h-2.5 bg-success rounded-xs"></div>
      </div>

      <div class="flex items-center gap-1">
        <IconDatabase class="w-4.5 h-4.5" />
        <span class="text-xs font-bold text-base-content/50">Psql status</span>
        <div class="w-2.5 h-2.5 bg-success rounded-xs"></div>
      </div>

      <div class="flex items-center gap-1">
        <IconQuestionMark class="w-4.5 h-4.5" />
        <span class="text-xs font-bold text-base-content/50">Redis status</span>
        <div class="w-2.5 h-2.5 bg-success rounded-xs"></div>
      </div>

      <div class="flex items-center gap-1">
        <IconQuestionMark class="w-4.5 h-4.5" />
        <span class="text-xs font-bold text-base-content/50">Spark status</span>
        <div class="w-2.5 h-2.5 bg-success rounded-xs"></div>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <IconSignalFull class="w-4.5 h-4.5 text-success" />
      <span class="text-xs font-bold text-base-content/50">Joel PINHO</span>
      <span class="text-xs font-bold text-base-content/50">{{ clock }}</span>
    </div>
  </div>
</template>
