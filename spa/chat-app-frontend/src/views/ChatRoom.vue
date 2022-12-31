<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const { id } = router.currentRoute.value.params;
</script>
<template>
    <div>
        Hello Chat room n°{{ id }}
    </div>
</template>
<style>

</style>