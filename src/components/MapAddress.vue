<template>
    <div ref="mapContainer" id="map" style="height: 600px; width: 800px;"></div>
</template>

<script lang="ts" setup>
import { onMounted, watch, ref, onBeforeUnmount } from 'vue';
import L from 'leaflet';

const mapContainer = ref<HTMLElement | null>(null);
const map = ref<L.Map>();

const props = defineProps({
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    }
})

onMounted(() => {
    if (!map.value && mapContainer.value) {
        map.value = L.map(mapContainer.value);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map.value);
    }
    
    if (props.latitude !== undefined && props.longitude && map.value) {
        map.value?.setView([props.latitude, props.longitude], 18);
        L.marker([props.latitude, props.longitude]).addTo(map.value);
    } else {
        map.value?.setView([0, 0], 18);
    }
});

watch(() => [props.latitude, props.longitude], ([newLat, newLong]) => {
    if (map.value) {
        map.value.setView([newLat, newLong]);
        L.marker([newLat, newLong]).addTo(map.value);
    }
});

onBeforeUnmount(() => {
    if (mapContainer.value ) {
        mapContainer.value.style.display = 'none';
    }
});

</script>