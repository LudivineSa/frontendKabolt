<script setup lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue'
import { NPagination } from 'naive-ui'
import SearchBar from '@/components/SearchBar.vue'
import CompaniesList from '@/components/CompaniesList.vue'
import { getTotalCompanies } from '@/api/api';
import type { ITotal } from '@/utils/interface';

defineComponent({
  component: { SearchBar, CompaniesList }
})
const currentPage = ref(1);
const totalPage = ref(0);
const nameSearched = ref('')

const resultPerPage = 12

const handleNameSearched = (name : string) => {
  nameSearched.value = name
}

const fetchTotalCompanies = (name? : string) => {
  getTotalCompanies(name).then((data : ITotal[]) => {
    totalPage.value = Math.ceil(data[0].total / resultPerPage)
  })
}

onMounted(() => {
  fetchTotalCompanies()
})

watch(nameSearched, () => {
  fetchTotalCompanies(nameSearched.value)
})

</script>

<template>
  <main class="container">
    <SearchBar @search-name="handleNameSearched"/>
    <h1>Entreprises à Lyon 1er</h1>
    <h2>Utilisez notre outil de recherche pour trouver une entreprise selon son nom, ou bien accédez directement aux milliers d’entreprises disponibles dans notre base de données. </h2>
    <CompaniesList :currentPage="currentPage" :name-searched="nameSearched"/>
    <n-pagination v-model:page="currentPage" :page-count="totalPage" />
  </main>
</template>

<style scoped>
.n-pagination {
  justify-content: center;
  font-weight: 700;
  margin-top: 2rem;
  background-color: white;
  padding: 1rem;
}

.n-pagination > div {
  font-weight: 700;
}

</style>
