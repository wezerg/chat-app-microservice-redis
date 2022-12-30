<script setup>
    import {ref} from 'vue';
    import {useAuthService} from '../services/authService';
    import { useRouter } from "vue-router";

    const {user, login, register} = useAuthService();

    const toggle = ref(true);
    const username = ref('');
    const password = ref('');
    const confirmPassword = ref('');
    const errorMessage = ref('');
    
    const router = useRouter();

    async function loginForm(){
        if (username.value && password.value) {
            const {status, data, error} = await login(username.value, password.value);
            if (status === 200) {
                user.value = data;
                router.push({ name: "home" });
            }
            else{
                errorMessage.value = error;
            }
        }
        else{
            errorMessage.value = "Veuillez renseigner votre pseudo et votre mot de passe"; 
        }
    }
    async function registerForm(){
        if (username.value && password.value && confirmPassword.value) {
            if (password.value === confirmPassword.value) {
                const {status, data, error} = await register(username.value, password.value, confirmPassword.value);
                if (status === 200) {
                    user.value = data;
                    router.push({ name: "home" });
                }
                else{
                    errorMessage.value = error;
                }
            }
            else{
                errorMessage.value = "Le mot de passe et sa confirmation ne correspondent pas"; 
            }
        }
        else{
            errorMessage.value = "Veuillez renseigner un pseudo, un mot de passe et sa confirmation"; 
        }
    }
</script>
<template>
    <button @click="toggle = !toggle">{{toggle ? "Je ne suis pas inscrit" : "Je suis déja inscrit"}}</button>
    <div v-if="toggle">
        <form @submit.prevent="loginForm()">
            <input type="text" name="username" placeholder="Pseudonyme" v-model="username">
            <input type="password" name="password" placeholder="Mot de passe" v-model="password">
            <button type="submit">Me connecté</button>
        </form>
    </div>
    <div v-else>
        <form  @submit.prevent="registerForm()">
            <input type="text" name="username" placeholder="Pseudonyme" v-model="username">
            <input type="password" name="password" placeholder="Mot de passe" v-model="password">
            <input type="password" name="confirmPassword" placeholder="Confirmation du mot de passe" v-model="confirmPassword">
            <button type="submit">M'inscrire</button>
        </form>
    </div>
    <p class="error-message">{{ errorMessage }}</p>
</template>
<style scoped>

</style>