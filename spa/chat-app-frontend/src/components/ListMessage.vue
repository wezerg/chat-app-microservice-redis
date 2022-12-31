<script setup>
import { ref, onMounted } from 'vue';
import instAxios from '../services/InstAxios';

const messages = ref([]);
defineProps({
    roomId: {
        default: null
    }
});

onMounted(async () => {
    /**
     * Connection to websocket
     * Listener to reads messages from micro service
     * Save message in messages ref
     */
});
</script>
<template>
    <div class="chatbox-messages">
        <ul v-if="messages && messages.length">
            <li v-for="m of messages">{{ m.text }}</li>
        </ul>
    </div>
</template>
<style>
.chatbox-messages{
    flex-grow: 1;
    overflow-y: auto;
    margin-bottom: 16px;
}
</style>