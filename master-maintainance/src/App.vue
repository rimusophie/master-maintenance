<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import MasMainHeader from './components/MasMainHeader.vue';
import MasMainFooter from './components/MastMainFooter.vue';
</script>

<template>
  <header class="w-100 pt-3 pb-3 header-design">
    <MasMainHeader />
  </header>
  
  <main class="w-100 pt-3 pb-3">
    <RouterView />
  </main>

  <footer class="w-100 pt-3 pb-3 footer-design">
    <MasMainFooter />
  </footer>
</template>

<style scoped>
.header-design {
    background-color: var(--header-background-color);
}
.footer-design {
    background-color: var(--footer-background-color);
}
</style>
