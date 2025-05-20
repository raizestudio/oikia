<script setup lang="ts"></script>

<template>
  <div class="card bg-base-200 w-96 shadow-sm">
    <!-- <figure>
      <img
        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
        alt="Shoes"
      />
    </figure> -->
    <div class="card-body">
      <slot name="body" />
    </div>
  </div>
</template>
