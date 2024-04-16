<template>    
    <greeting :title="tilte"></greeting>
</template>

<script>
import Greeting from "@/components/Utils/Greeting.vue";

export default {
    data() {
        return {
            tilte: "Quản lý nhà xuất bản!",
        };
    },
    components: {
        Greeting,
    },
}
</script>

<style>
</style>