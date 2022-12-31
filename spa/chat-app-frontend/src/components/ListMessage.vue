<script setup>
import { ref, onMounted } from 'vue';
import instAxios from '../services/InstAxios';

const messages = ref([]);
defineProps({
    roomId: {
        type: String,
        default: ""
    }
});

onMounted(async () => {
    try {
        const ws = new WebSocket("ws://localhost:3000/listener");
        ws.onmessage = ({data}) => {
            messages.value = JSON.parse(data);
        }
    } catch(err) {
        console.log(err);
    }
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