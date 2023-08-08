<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { NCard, NButton } from 'naive-ui';
import { useRouter } from 'vue-router';
import type { ICompany } from '@/utils/interface';
defineProps<{
    company: ICompany;
}>();

const image = ref('');

onMounted(() => {
    image.value = `https://picsum.photos/200/300`;
});

const router = useRouter();
const redirectToDetail = (id: string) => {
    router.push(`/company/${id}`);
};
</script>

<template>
    <n-card :bordered="false" hoverable :title="company.name">
        <template #cover>
            <img :src="company.image">
        </template>
        <div class="seeMoreDetails">
            <n-button  color="#8a2be2" size="large" round class="btnSeeMore" @click="() => redirectToDetail(company.id)">Voir plus</n-button>
        </div>
    </n-card>
</template>

<style scoped>
.n-card {
    height: 100%;
    border-radius: 10px;
    position: relative;
}

.seeMoreDetails {
    z-index: 10;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(41, 41, 41, 0.8);
    transition: all 0.5s ease-out;
    opacity: 0;
}

.seeMoreDetails:hover {
    opacity: 1;
}

.btnSeeMore {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>