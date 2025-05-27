<script setup lang="ts">
// Icons
import IconTable from '@/components/icons/IconTable.vue'
import IconGauge from '@/components/icons/IconGauge.vue'
import IconGear from '@/components/icons/IconGear.vue'

const props = defineProps<{
  title: string
}>()
</script>

<template>
  <div class="flex justify-between">
    <div>
      <h1 class="text-2xl font-bold">{{ props.title }}</h1>
    </div>
    <div>
      <button class="btn btn-ghost btn-sm">
        <IconTable class="w-6 h-6" />
      </button>
      <button class="btn btn-ghost btn-sm">
        <IconGauge class="w-6 h-6" />
      </button>
      <button class="btn btn-ghost btn-sm">
        <IconGear class="w-6 h-6" />
      </button>
    </div>
  </div>
</template>
