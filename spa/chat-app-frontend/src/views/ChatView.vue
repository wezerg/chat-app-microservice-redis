<script setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const rooms = ref([{name: "general", id: 1},{name: "dev", id: 2},{name: "design", id: 3}]);
</script>
<template>
    <div>
        <h1>List of chat rooms</h1>
        <div class="container-link" v-if="rooms.length">
            <RouterLink class="link-chat-room" v-for="r in rooms" :to="'/rooms/' + r.id">{{ r.name }}</RouterLink>
        </div>
    </div>
</template>
<style>
.container-link{
    display: flex;
}
.link-chat-room{
    transition: all ease-in-out 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 80px;
    box-shadow: 0 0 4px 2px #565964;
    border-radius: 5px;
    padding: 8px 16px;
    margin: 8px;
    text-decoration: none;
}
.link-chat-room:hover{
    transition: all ease-in-out 0.15s;
    box-shadow: 0 0 4px 2px #f3f3f3;
    scale: 1.05;
}
</style>