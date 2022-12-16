<script setup>
import { RouterLink } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios';

const count = ref(0);

onMounted(async () => {
    try {
        const response = await axios.get("/hits");
        count.value = parseInt(response.data);
    } catch (error) {
        console.error(error);
    }
});
</script>

<template>
    <header>
        <nav>
            <div>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/login">Login / Register</RouterLink>
            </div>
            <div>
                <p>Compteur de visites : {{count}}</p>
            </div>
        </nav>
    </header>
</template>

<style scoped>
nav{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
nav a, p{
    padding: 4px 8px;
    color: white;
    text-decoration: none;
}
p{
    margin: 0;
}
nav a:hover{
    text-decoration: underline;
}
</style>