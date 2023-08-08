<template>
  <n-space align="center" justify="end">
    <n-input clearable size="large" class="input" round v-model:value="value" name="company" type="text" placeholder="Chercher une entreprise par nom" />
    <n-button color="#8a2be2" size="large" round @click="search()">Rechercher</n-button>
  </n-space>  
</template>
  
  <script setup lang="ts">
    import { NSpace, NInput, NButton } from 'naive-ui';
    import { getCompanyByName } from '@/api/api';
    import { ref } from 'vue';

    const value = ref('');

    const emit = defineEmits(['searchName'])

    const search = () => {
        getCompanyByName(value.value);
        emit('searchName', value.value)
    }
     
  </script>

  <style scoped>
    .input {
      min-width: 20rem;
    }
</style>