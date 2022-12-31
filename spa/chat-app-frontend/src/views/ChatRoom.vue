<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import instAxios from '../services/InstAxios';

const router = useRouter();
const { id } = router.currentRoute.value.params;

const room = ref([]);
onMounted(async () => {
    const {status, data} = await instAxios().get(`/chatrooms/${id}`).catch(error => error.response);
    if (status === 200) {
        room.value = data;
    }
});
</script>
<template>
    <div>
        <h1>Bienvenue dans le salon {{ room.name }}</h1>
    </div>
</template>
<style>

</style>