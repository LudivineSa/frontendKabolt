<script setup lang="ts">
import { reactive, defineComponent, watch, onMounted } from 'vue';
import CompanyCard from "@/components/CompanyCard.vue"
import { getCompanies, getCompanyByName } from '@/api/api';
import type { ICompany } from '@/utils/interface';

let companies : any[] = reactive([])

const props = defineProps<{
    currentPage: number;
    nameSearched: string;
}>();

const fetchCompanies = () => {
    getCompanies(props.currentPage).then((data : ICompany[]) => {
        companies.splice(0, companies.length)
        data.map((company: ICompany) => {
            company.image = `https://picsum.photos/seed/${company.id}/200`
            companies.push(company)
        })
    })
}

watch(() => props.currentPage, () => {
    fetchCompanies()
})

watch(() => props.nameSearched, () => {
    getCompanyByName(props.nameSearched).then((data : ICompany[]) => {
        companies.splice(0, companies.length)
        data.map((company: ICompany) => {
            company.image = `https://picsum.photos/seed/${company.id}/200`
            companies.push(company)
        })
    })
})

onMounted(() => {
    fetchCompanies()
})

defineComponent({
  component: { CompanyCard }
})

</script>

<template>
    <div class="grid-container">
        <div class="grid-item" v-for="company in companies" :key="company.id">
            <CompanyCard :company="company" />
        </div>
    </div>
</template>

<style scoped>
.grid-container {
    display: grid;
    grid-auto-rows: 1fr;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
    margin: 1rem;
}

.grid-item {
    overflow: hidden;
    height: 100%;
    cursor: pointer;
    box-shadow: 4px 5px 8px 3px rgba(0,0,0,0.42);
}

@media (max-width: 1200px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 760px) {
    .grid-container {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 500px) {
    .grid-container {
        grid-template-columns: repeat(1, 1fr);
    }
}

</style>