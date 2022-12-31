<script setup>
    defineProps({
        roomId: {
            default: null
        }
    });
</script>
<template>
    <div class="chatbox-messages">
        <!-- Display list of messages -->
    </div>
</template>
<style>
.chatbox-messages{
    flex-grow: 1;
    overflow-y: auto;
    margin-bottom: 16px;
}
</style>