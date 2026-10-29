<template>
  <div id="app" class="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 text-stone-900">
    <AppHeader />
    <router-view />
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Noto Sans SC', 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif;
  color: #3D2914;
}

h1, h2, h3 {
  font-family: 'Noto Serif SC', 'Malgun Gothic', 'Apple SD Gothic Neo', serif;
}
</style>
