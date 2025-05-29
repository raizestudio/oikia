<script setup lang="ts">
import { onMounted } from 'vue'

// Components
import HeroComponent from '@/components/hero/HeroComponent.vue'
// import MapComponent from '@/components/map/MapComponent.vue'
import CardComponent from '@/components/card/CardComponent.vue'
import AvatarComponent from '@/components/avatar/AvatarComponent.vue'
import FranceChartComponent from '@/components/charts/FranceChartComponent.vue'

// Icons
import IconMapPin from '@/components/icons/IconMapPin.vue'
import IconBookOpen from '@/components/icons/IconBookOpen.vue'
import IconShield from '@/components/icons/IconShield.vue'

const appName = import.meta.env.VITE_APP_NAME

onMounted(() => {
  document.title = `${appName} | Trouvez votre prochain chez vous`
})
</script>

<template>
  <div class="h-[calc(100vh-64px)]">
    <HeroComponent
      class="h-full"
      title="Trouvez votre prochain chez vous"
      description="Notre application vous aide à trouver l'endroit idéal pour vivre, que ce soit un appartement, une maison ou un studio."
    />
  </div>
  <!-- SEC -->
  <div class="flex flex-col gap-16 px-10 py-32">
    <div class="self-center">
      <h2 class="text-3xl font-bold">Pourquoi choisir {{ appName }}</h2>
    </div>
    <div class="flex gap-4 justify-around">
      <CardComponent>
        <template #body>
          <div class="flex flex-col gap-4">
            <IconMapPin />
            <div class="flex flex-col gap-2">
              <span class="text-lg font-semibold">Localisation intelligente</span>
              <span
                >Notre IA analyse des milliers de lieux pour trouver ceux qui correspondent à vos
                besoins et préférences spécifiques.</span
              >
            </div>
          </div>
        </template>
      </CardComponent>
      <!--  -->
      <CardComponent>
        <template #body>
          <div class="flex flex-col gap-4">
            <IconBookOpen />
            <div class="flex flex-col gap-2">
              <span class="text-lg font-semibold">Données détaillées</span>
              <span
                >Obtenez des informations sur le coût de la vie, les écoles, la sécurité, les
                équipements, et plus encore pour chaque lieu recommandé.</span
              >
            </div>
          </div>
        </template>
      </CardComponent>
      <!--  -->
      <CardComponent>
        <template #body>
          <div class="flex flex-col gap-4">
            <IconShield />
            <div class="flex flex-col gap-2">
              <span class="text-lg font-semibold">Recommandations personnalisées</span>
              <span
                >Dites-nous ce qui compte le plus pour vous, et nous classerons par ordre de
                priorité les lieux qui répondent à vos critères les plus importants.</span
              >
            </div>
          </div>
        </template>
      </CardComponent>
      <!-- <div class="bg-base-200">
        <IconMapPin />
        <span>Card 1</span>
      </div>
      <div>
        <IconBookOpen />
        <span>Card 2</span>
      </div>
      <div>
        <IconShield />
        <span>Card 3</span>
      </div> -->
    </div>
  </div>
  <!-- THIRD -->
  <div class="flex flex-col gap-16 px-10 py-32 bg-base-200">
    <div class="self-center">
      <h2 class="text-3xl font-bold">Comment ça marche ?</h2>
    </div>
    <div class="flex gap-4 justify-around">
      <CardComponent>
        <template #body>
          <div class="flex flex-col items-center gap-4">
            <div class="w-12 h-12 flex justify-center items-center bg-base-300 rounded-full p-2">
              <span class="text-lg font-bold">1</span>
            </div>
            <span class="text-lg font-semibold">Décrivez votre emplacement idéal</span>
            <span class="text-center">
              Utilisez le langage naturel pour dire à notre IA ce que vous recherchez dans votre
              prochaine maison.
            </span>
          </div>
        </template>
      </CardComponent>
      <CardComponent>
        <template #body>
          <div class="flex flex-col items-center gap-4">
            <div class="w-12 h-12 flex justify-center items-center bg-base-300 rounded-full p-2">
              <span class="text-lg font-bold">2</span>
            </div>
            <span class="text-lg font-semibold">Obtenez des résultats personnalisées</span>
            <span class="text-center">
              Notre IA analyse vos préférences et vous propose une liste de lieux qui correspondent
              à vos critères.
            </span>
          </div>
        </template>
      </CardComponent>
      <CardComponent>
        <template #body>
          <div class="flex flex-col items-center gap-4">
            <div class="w-12 h-12 flex justify-center items-center bg-base-300 rounded-full p-2">
              <span class="text-lg font-bold">3</span>
            </div>
            <span class="text-lg font-semibold">Explorer les informations détaillées</span>
            <span class="text-center">
              Plongez dans des données complètes sur chaque site pour prendre une décision éclairée.
            </span>
          </div>
        </template>
      </CardComponent>
    </div>
  </div>
  <!-- FOURTH -->
  <div class="flex flex-col gap-16 px-10 py-32">
    <div class="self-center">
      <h2 class="text-3xl font-bold">Ce que disent nos utilisateurs</h2>
    </div>
    <div class="flex justify-center gap-16">
      <CardComponent>
        <template #body>
          <div class="flex flex-col gap-4">
            <div class="flex gap-4">
              <AvatarComponent
                image="https://img.daisyui.com/images/profile/demo/yellingwoman@192.webp"
              />
              <div class="flex flex-col">
                <span class="font-semibold">Jane doe</span>
                <span>Déménagement de Tours à Montpellier</span>
              </div>
            </div>

            <div>
              <cite
                >"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non mi commodo,
                fermentum metus vitae, vulputate leo. Aenean maximus urna quis tortor ultrices
                aliquam."</cite
              >
            </div>
          </div>
        </template>
      </CardComponent>
      <CardComponent>
        <template #body>
          <div class="flex flex-col gap-4">
            <div class="flex gap-4">
              <AvatarComponent
                image="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
              />
              <div class="flex flex-col">
                <span class="font-semibold">Jon doe</span>
                <span>Déménagement pour travail à distance</span>
              </div>
            </div>

            <div>
              <cite
                >"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non mi commodo,
                fermentum metus vitae, vulputate leo. Aenean maximus urna quis tortor ultrices
                aliquam."</cite
              >
            </div>
          </div>
        </template>
      </CardComponent>
    </div>
  </div>
  <!-- FIFTH -->
  <div class="flex py-10 px-20">
    <FranceChartComponent />
    <div>
      <h2 class="text-3xl font-bold">
        Besoin d'informations détaillées sur une région, département, ville ou quartier ?
      </h2>
    </div>
  </div>
  <!-- SIXTH -->
  <div class="flex flex-col gap-8 px-10 py-32 bg-base-content">
    <div class="self-center">
      <h2 class="text-3xl font-bold text-base-300">Prêt à découvrir l'endroit idéal ?</h2>
    </div>
    <div class="flex flex-col gap-4 items-center">
      <span class="text-base-100 font-semibold"
        >Laissez notre IA vous aider à découvrir l'endroit idéal pour votre prochain chapitre.</span
      >
      <button class="btn btn-base-content btn-lg">
        <span class="">Commencer</span>
      </button>
    </div>
  </div>

  <!-- SEVENTH -->
  <div>
    <h2 class="text-3xl font-bold text-base-content">Quelques statistiques</h2>
    <CardComponent>
      <template #body>
        <div class="flex flex-col gap-4">
          <span>Pays</span>
          <span>1</span>
        </div>
      </template>
    </CardComponent>
  </div>
  <!-- todo not sure about this one, map ok though  -->
  <!-- <div class="h-screen flex items-center">
    <div class="w-2/5 h-2/3">
      <MapComponent />
    </div>
    <div class="flex self-start">
      <span
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non mi commodo, fermentum
        metus vitae, vulputate leo. Aenean maximus urna quis tortor ultrices aliquam.</span
      >
    </div>
  </div> -->
</template>
