<script setup>
    import {ref} from 'vue';
    
    const toggle = ref(true)

    function login(){
        console.log("Login");
    }
    function register(){
        console.log("Register");
    }
</script>
<template>
    <button @click="toggle = !toggle">{{toggle ? "Je ne suis pas inscrit" : "Je suis déja inscrit"}}</button>
    <div v-if="toggle">
        <form @submit.prevent="login()">
            <input type="text" name="username" placeholder="Pseudonyme">
            <input type="password" name="password" placeholder="Mot de passe">
            <button type="submit">Me connecté</button>
        </form>
    </div>
    <div v-else>
        <form  @submit.prevent="register()">
            <input type="text" name="username" placeholder="Pseudonyme">
            <input type="password" name="password" placeholder="Mot de passe">
            <input type="password" name="confirmPassword" placeholder="Confirmation du mot de passe">
            <button type="submit">M'inscrire</button>
        </form>
    </div>
</template>
<style scoped>
input, button{
    transition: all ease-in-out 0.15s;
    display: block;
    height: 32px;
    background-color: unset;
    border: unset;
    color: white;
    box-shadow: 0 0 4px 2px #565964;
    border-radius: 8px;
    padding: 4px 8px;
    margin: 8px;
}
input:focus, button:focus{
    outline: none;
    box-shadow: 0 0 4px 2px #797a7c;
}
input{
    min-width: 200px;
}
button{
    cursor: pointer;
}
button:hover{
    transition: all ease-in-out 0.15s;
    color: #565964;
    background-color: #FFFFFF;
}
form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>