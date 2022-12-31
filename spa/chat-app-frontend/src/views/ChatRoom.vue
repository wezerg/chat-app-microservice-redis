<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import instAxios from '../services/InstAxios';
import ListMessage from '../components/ListMessage.vue';

const router = useRouter();
const { id } = router.currentRoute.value.params;

const room = ref([]);
const sendingMessage = ref('');
onMounted(async () => {
    const {status, data} = await instAxios().get(`/chatrooms/${id}`).catch(error => error.response);
    if (status === 200) {
        room.value = data;
    }
});
function sendMessage(){
    console.log(sendingMessage);
    /**
     * Get sendingMessage variable
     * Send to micro service
     * Remove sendingMessage value
     */
}
</script>
<template>
    <div class="chatroom-container">
        <h1>Bienvenue dans le salon {{ room.name }}</h1>
        <ListMessage :roomId="room.id"/>
        <form @submit.prevent="sendMessage()" class="form-sending-message">
            <input type="text" name="message" placeholder="Message..." v-model="sendingMessage">
            <button type="submit" style="height: 32px;">Envoyer</button>
        </form>
    </div>
</template>
<style>
.chatroom-container{
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}
.form-sending-message{
    flex-direction: row;
}
</style>