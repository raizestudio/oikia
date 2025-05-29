<script setup lang="ts">
const roleColorClassMap: Record<string, string> = {
  superuser: 'bg-purple-400/50',
  admin: 'bg-red-400/50',
  user: 'bg-green-400/50',
}

const props = defineProps<{
  avatar: string | null
  label?: string
  role?: string
  fallback?: string
}>()

const getRoleColorClass = (role?: string): string => {
  return roleColorClassMap[role ?? ''] ?? 'bg-base-300'
}
</script>

<template>
  <div class="flex items-center gap-4">
    <div v-if="props.avatar" class="avatar">
      <div class="w-10 rounded-full">
        <img :src="props.avatar" />
      </div>
    </div>
    <div v-else class="avatar avatar-placeholder">
      <div class="bg-primary/20 text-neutral-content w-10 rounded-full">
        <span class="text-xs font-black">{{ props.fallback }}</span>
      </div>
    </div>
    <div class="flex flex-col">
      <span class="font-semibold">{{ props.label }}</span>
      <span
        :class="`badge badge-sm font-semibold ${props.role ? getRoleColorClass(props.role) : ''}`"
        >{{ props.role }}</span
      >
    </div>
  </div>
</template>
