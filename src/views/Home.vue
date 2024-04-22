<template>
    <div class="">
        <greeting :title="tilte"></greeting>
    </div>
</template>

<script>
import Greeting from "@/components/Common/Greeting.vue";
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