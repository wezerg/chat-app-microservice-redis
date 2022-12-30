<script setup>
import { useAuthService } from '../services/authService';

const {user} = useAuthService();
</script>

<template>
    <h1>Chat application</h1>
    <p v-if="!user">Veuillez vous connecté pour continuer</p>
    <p v-else>Rebonjour à vous {{ user.username }}</p>
</template>
