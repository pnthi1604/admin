<template>
    <div class="home-page">
        <greeting :title="tilte"></greeting>
    </div>
</template>

<script>
import Greeting from "@/components/Common/Greeting.vue";
export default {
    data() {
        return {
            tilte: "Chào mừng bạn đến với trang admin!",
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

.home-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 1.5rem;
}
</style>