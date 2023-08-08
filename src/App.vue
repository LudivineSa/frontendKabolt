<script setup lang="ts">
import { RouterView } from 'vue-router'
import { NConfigProvider } from 'naive-ui'
import "leaflet/dist/leaflet.css";
const themeOverrides = {
  
    common: {
      primaryColor: '#8a2be2',
      primaryColorHover: '#8a2be2',
      primaryColorPressed: '#8a2be2',
      primaryColorActive: '#8a2be2',
    },
    Button: {
      textColor: '#161432',
      color: '#fff' ,
      bordered: false, 
    },
}

</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <RouterView />
  </n-config-provider>
</template>
