<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import { useAuthService } from './services/authService';

const {user, loginAuto} = useAuthService();

onMounted(async () => {
    const {status, data} = await loginAuto();
    if (status === 200) {
        user.value = data;
    }
});
</script>

<template>
    <Header></Header>
    <RouterView />
</template>

<style scoped>

</style>