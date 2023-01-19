<script setup>
import { defineProps, ref, onMounted, toRefs } from 'vue';
import { useAuthService } from '../services/authService';

const messages = ref([]);
const { user } = useAuthService();
const props = defineProps({
    roomId: {
        type: String,
        default: ""
    }
});

const { roomId } = toRefs(props);
const baseUrlListen = import.meta.env.VITE_URL_LISTEN;

onMounted(async () => {
    try {
        const ws = new WebSocket(`${baseUrlListen}/listener/${roomId.value}`);
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
            <li v-for="m of messages" :class="user.id !== m.userId ? 'card-messages' : 'card-messages-own'">
                <span class="messages-user">{{ m.username }}</span>
                <div>{{ m.text }}</div>
                <span class="messages-date">{{ new Date(m.date) }}</span>
            </li>
        </ul>
    </div>
</template>
<style>
.chatbox-messages{
    display: flex;
    flex-direction: column;
    justify-content: end;
    flex-grow: 1;
}
ul{
    padding: 0 8px;
    max-height: 700px;
    overflow-y: auto;
    display: flex;
    flex-direction: column-reverse;
}
li[class^="card-messages"]{
    list-style-type: none;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
}
li[class^="card-messages"] > div{
    list-style-type: none;
    box-shadow: 0 0 4px 2px #565964;
    max-width: 45%;
    border-radius: 5px;
    padding: 8px;
}
li[class^="card-messages"] > .messages-user{
    color: #5c71bd;
}
li[class^="card-messages"] > .messages-date{
    color: #565964;
    font-size: 12px;
}
li.card-messages-own{
    align-items: flex-end;
}
li.card-messages-own > .messages-user{
    color: #bd805c;
}
</style>