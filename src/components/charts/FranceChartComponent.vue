<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts/core'
import { use } from 'echarts/core'
import { MapChart } from 'echarts/charts'
import { TitleComponent, TooltipComponent, VisualMapComponent } from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'
import regionJson from '@/assets/regions.json'

// Register required ECharts modules
use([MapChart, TitleComponent, TooltipComponent, VisualMapComponent, CanvasRenderer])

const option = ref({})
const chartRef = ref()

onMounted(async () => {
  // Replace this with your actual GeoJSON
  // const geoJson =  as any;

  echarts.registerMap('france-test', regionJson as any)

  option.value = {
    // title: {
    //   text: 'France Test Map',
    //   left: 'center',
    // },
    tooltip: {
      trigger: 'item',
      formatter: '{b}',
    },
    visualMap: {
      show: false,
      min: 0,
      max: 100,
      inRange: {
        color: []
      },
    },
    series: [
      {
        name: 'Regions',
        type: 'map',
        map: 'france-test',
        roam: true,
        label: {
          show: true,
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1,
          areaColor: '#d1d1d1',
        },
        emphasis: {
          label: {
            show: true,
            fontWeight: 'bold',
            color: '#000',
            areaColor: '#fff',
          },
          itemStyle: {
            areaColor: '#fff',
          },
        },
        select: {
          itemStyle: {
            areaColor: '#5754E8', // highlight color when selected
            borderColor: '#222',
            borderWidth: 2,
          },
          label: {
            color: '#000',
            fontWeight: 'bold',
          },
        },
        data: [
          {
            name: 'Bourgogne-Franche-Comté',
            value: 42,
            // itemStyle: {
            //   areaColor: '#0362fc',
            // },
          },
          { name: 'Centre-Val de Loire', value: 42 },
          { name: 'Île-de-France', value: 42 },
          { name: 'Corse', value: 42 },
          { name: 'Auvergne-Rhône-Alpes', value: 42 },
          { name: "Provence-Alpes-Côte d'Azur", value: 42 },
          { name: 'Occitanie', value: 42 },
          { name: 'Nouvelle-Aquitaine', value: 42 },
          { name: 'Bretagne', value: 42 },
          { name: 'Normandie', value: 42 },
          { name: 'Hauts-de-France', value: 42 },
          { name: 'Grand Est', value: 42 },
          { name: 'Pays de la Loire', value: 42 },
          { name: 'Loire-Atlantique', value: 42 },
        ],
      },
    ],
  }
})
</script>

<template>
  <v-chart ref="chartRef" class="!h-[500px] !w-1/3 rounded" :option="option" autoresize />
</template>
