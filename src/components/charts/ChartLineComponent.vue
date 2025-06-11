<script setup lang="ts">
import { ref } from 'vue'

const chartOptions = ref({
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    boundaryGap: false,
  },
  yAxis: {
    type: 'value',
    name: 'Tokens',
  },
  series: [
    {
      name: 'Prompt Tokens',
      type: 'line',
      data: [12000, 15000, 10000, 18000, 16000, 14000, 19000],
      smooth: true,
      areaStyle: {},
    },
    {
      name: 'Completion Tokens',
      type: 'line',
      data: [8000, 9000, 7000, 11000, 10000, 9500, 10500],
      smooth: true,
      areaStyle: {},
    },
  ],
  legend: {
    data: ['Prompt Tokens', 'Completion Tokens'],
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
})
</script>

<style scoped>
/* Optional: custom styles if needed */
</style>

<template>
  <div class="min-h-[600px] w-full p-6 bg-base-100 rounded">
    <h2 class="text-2xl font-bold text-primary">OpenAI API Usage (Last 7 Days)</h2>
    <div class="w-full h-full">
      <v-chart :option="chartOptions" autoresize class="w-full h-full" />
    </div>
  </div>
</template>
