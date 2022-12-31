<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import instAxios from '../services/InstAxios';
import ListMessage from '../components/ListMessage.vue';
import { useAuthService } from '../services/authService';

const router = useRouter();
const { id } = router.currentRoute.value.params;
const { user } = useAuthService();

const room = ref([]);
const sendingMessage = ref('');
onMounted(async () => {
    const {status, data} = await instAxios().get(`/chatrooms/${id}`).catch(error => error.response);
    if (status === 200) {
        room.value = data;
    }
});
async function sendMessage(){
    const payload = {
        roomId: id,
        text: sendingMessage.value,
        username: user.value.username
    }
    const {status} = await instAxios().post('/publish', payload).catch(error => error.response);
    if (status === 200) {
        sendingMessage.value = "";
    }
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