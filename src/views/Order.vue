<template>    
    <greeting :title="tilte"></greeting>
</template>

<script>
import Greeting from "@/components/Utils/Greeting.vue";

export default {
    data() {
        return {
            tilte: "Quản lý đơn hàng!",
        };
    },
    components: {
        Greeting,
    },
}
</script>

<style>
</style>