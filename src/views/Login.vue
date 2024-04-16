<template>
    <div class="container">
        <login :isRegister="isRegister" :titleForm="titleForm" @submit="handleSubmit"></login>
    </div>
</template>

<script>
import Login from "@/components/Auth/Auth.vue";
import authService from "@/services/auth.service";
import { mapStores } from 'pinia'
import useAuthStore from "@/stores/auth.store"

export default {
    computed: {
        ...mapStores(useAuthStore)
    },
    data() {
        return {
            isRegister: false,
            titleForm: 'Đăng nhập'
        };
    },
    components: {
        Login,
    },
    methods: {
        async handleSubmit(data) {
            try {
                const response = await authService.login(data)
                this.authStore.setRole(response?.data?.data?.role)
                // alert(response.data.message)
                this.$router.push({ name: "adminPage"})
            } catch (err) {
                alert(err.response.data.message)
            }
        }
    }
};
</script>

<style scoped>
.container {
    max-width: 400px;
}
</style>