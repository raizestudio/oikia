<script setup lang="ts">
import type { Component } from 'vue'

// Icons
import IconArrow from '@/components/icons/IconArrow.vue'
import IconCurrencyEuro from '@/components/icons/IconCurrencyEuro.vue'
import IconProfile from '@/components/icons/IconProfile.vue'
import IconChatCenteredDots from '@/components/icons/IconChatCenteredDots.vue'
import IconWarning from '@/components/icons/IconWarning.vue'

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: false,
  },
  value: {
    type: String,
    required: true,
  },
  labelBadge: {
    type: String,
    required: false,
  },
  labelFooter: {
    type: String,
    required: false,
  },
})

const iconMap: Record<string, Component> = {
  IconCurrencyEuro,
  IconProfile,
  IconChatCenteredDots,
  IconWarning,
}
</script>

<template>
  <div class="card grow p-4 bg-base-100">
    <div class="flex">
      <div class="flex flex-col gap-4 grow">
        <span class="">{{ props.label }}</span>
        <div class="flex items-center gap-4">
          <span class="text-xl font-semibold">{{ props.value }}</span>
          <div class="badge badge-sm badge-soft badge-success gap-1">
            <IconArrow class="w-4 h-4 fill-success rotate-180" />
            <span>{{ props.labelBadge }}%</span>
          </div>
        </div>
      </div>
      <div class="h-min p-1.5 rounded bg-base-200">
        <component v-if="props.icon" :is="iconMap[props.icon]" class="w-6 h-6 fill-base-content" />
      </div>
    </div>
    <div>
      <span class="text-xs">{{ props.labelFooter }}</span>
    </div>
  </div>
</template>
