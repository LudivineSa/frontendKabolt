<script setup lang="ts">
import { getCompanyById } from '@/api/api';
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter} from 'vue-router';
import { NButton, NCard, NTabs, NTabPane } from 'naive-ui';
import MapAddress  from '@/components/MapAddress.vue';
import type { ICompany, ICompanyWithAddress } from '@/utils/interface';
  
const route = useRoute()
const company = ref<ICompanyWithAddress[]>([{
    name: '',
    address: '',
    id: '',
    isEnseignement: false,
    isOrganismeFormation: false,
    isServicePublic : false,
    idAssociation: null,
    isOrganismeSante: false,
    creationDate: '',
    isSpectacle: false,
    latitude: 0,
    longitude: 0

}]);

const characteristics = ref<string[]>([])

const router = useRouter();
onMounted(() => {
  const id = route.params.id as string
  getCompanyById(id).then((res) => {
    company.value = res
  })
})

watch(() => company.value, () => {
        for (let key in company.value[0] as ICompany) {
            if (key.startsWith('is') && company.value[0][key] === 1) {
                let transformedKey = key.substring(2);
                transformedKey = transformedKey.replace(/([A-Z])/g, ' $1').trim();
                characteristics.value.push(transformedKey)   
            }
            if (key === 'idAssociation' && company.value[0][key]) {
                characteristics.value.push('Association')
            }
        }
})

const redirectToHome = () => {
    router.push('/')
}

</script>

<template>
    <main class="container"> 
        <n-button  color="#8a2be2" ghost size="large" round class="btn" @click="redirectToHome">
            Retourner à l'accueil
        </n-button>
        <h1>{{ company[0].name }}</h1>
        <section class="characteristics">
            <div 
                v-for="characteristic in characteristics" 
                :key="characteristic"
                :style="{ backgroundColor: '#8a2be2', borderRadius: '20px' }"
            >                
                <p class="characteristic">{{ characteristic }}</p>
            </div>
        </section>
        <section class="address">
            <n-card title="Adresses" style="margin-bottom: 16px">
                <n-tabs type="line">
                    <n-tab-pane v-for="(adress, index) in company" :key="adress.address" :name="`Adresse ${index + 1}`" :active="index === 0">
                        {{ adress.address }}
                        <MapAddress :longitude="adress.longitude" :latitude="adress.latitude" />
                    </n-tab-pane>
                </n-tabs>
            </n-card>        
        </section>
    </main>
</template>

<style scoped>
.characteristics {
    display: flex;
    justify-content: center;
    gap: 2rem;
}

.characteristic {
    color: white;
    padding: 1rem;
    font-weight: 700;
}

.btn {
    margin-top: 2rem;
    margin-bottom: 2rem;
}

.address {
    margin-top: 2rem;
}

</style>