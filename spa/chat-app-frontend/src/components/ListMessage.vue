<script setup>
import { defineProps, ref, onMounted, toRefs } from 'vue';

const messages = ref([]);
const props = defineProps({
    roomId: {
        type: String,
        default: ""
    }
});

const { roomId } = toRefs(props);

onMounted(async () => {
    try {
        const ws = new WebSocket(`ws://localhost:3000/listener/${roomId.value}`);
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