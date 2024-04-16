<template>
    <app-header></app-header>
    <div class="container">
        <router-view></router-view>
    </div>
    <app-footer class="app-footer"></app-footer>
</template>

<script>
import AppHeader from "@/components/Common/AppHeader.vue"
import AppFooter from "@/components/Common/AppFooter.vue"

export default {
    components: {
        AppHeader,
        AppFooter,
    },
    data() {
        return {
        }
    },
}
</script>

<style>
.container {
    width: 80%;
    margin: 0 auto;
    margin-top: 12px;
    min-height: 1000px;
}

.app-footer {
    width: 1024px;
    bottom: 0;
}
</style>