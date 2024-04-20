<template>
    <div class="container">
        <login :isRegister="false" :titleForm="titleForm" @submit="handleSubmit"></login>
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
            titleForm: 'Đăng nhập'
        };
    },
    components: {
        Login,
    },
    methods: {
        async handleSubmit(data) {
            const res = await authService.login(data);
            if (res.status == "success") {
                this.authStore.setRole(res.data.role)
                localStorage.setItem("role", res.data.role)
                alert(res.message)
                this.$emit("login")
                this.$router.push({ name: "adminPage"})
            } else {
                alert(res.message)
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