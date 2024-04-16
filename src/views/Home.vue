<template>
    <greeting :title="tilte"></greeting>
</template>

<script>
import Greeting from "@/components/Utils/Greeting.vue";
export default {
    data() {
        return {
            tilte: "Chào mừng bạn!",
        };
    },
    components: {
        Greeting,
    },
}
</script>

<style scoped>
.title {
    text-align: center;
    color: plum;
}
</style>