<script setup lang="ts">
// Icons
import IconBell from '@/components/icons/IconBell.vue'
import IconSliders from '@/components/icons/IconSliders.vue'
import IconMagnifyingGlass from '@/components/icons/IconMagnifyingGlass.vue'
import IconBurger from '@/components/icons/IconBurger.vue'
import IconFlask from '@/components/icons/IconFlask.vue'
import IconEyes from '@/components/icons/IconEyes.vue'

const env = import.meta.env.DEV ? 'dev' : 'prod'
const isDemo = import.meta.env.VITE_IS_DEMO === 'true'
</script>

<template>
  <div class="navbar px-6 min-h-[56px] bg-base-200 border-b border-base-300">
    <!-- LEFT ACTIONS ? -->
    <div class="flex items-center gap-2">
      <IconBurger class="w-6 h-6 fill-base-content cursor-pointer" />
      <div
        v-if="env === 'dev' && !isDemo"
        class="tooltip tooltip-bottom"
        data-tip="Development environment"
      >
        <div class="bg-warning rounded p-0.5">
          <IconFlask class="fill-base-100 w-6 h-6" />
        </div>
      </div>

      <div
        v-else-if="isDemo"
        class="tooltip tooltip-bottom"
        data-tip="Demo environment, some features might be disabled, limited or not available"
      >
        <div class="bg-primary rounded p-0.5">
          <IconEyes class="fill-base-content w-6 h-6" title="Development environment" />
        </div>
      </div>
    </div>
    <!-- COMMAND PALETTE -->
    <div class="flex justify-center grow">
      <label class="input input-sm focus-within:outline-0">
        <IconMagnifyingGlass class="w-5 h-5 fill-base-content" />
        <input type="search" class="grow" placeholder="Quick access" />
        <kbd class="kbd kbd-sm">Ctrl</kbd>
        <span class="">+</span>
        <kbd class="kbd kbd-sm">K</kbd>
      </label>
    </div>
    <!-- RIGHT ACTIONS ? -->
    <div>
      <button class="btn btn-sm btn-ghost">
        <IconBell width="20" />
      </button>
      <button class="btn btn-sm btn-ghost">
        <IconSliders width="20" />
      </button>
    </div>
  </div>
</template>
