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
import employeeService from "@/services/employee.service"

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
                const responseGetEmployee = await employeeService.getEmployeeById(res.data.id)
                if (responseGetEmployee.status == "error") {
                    alert(responseGetEmployee.message)
                    return
                }
                this.authStore.setUser(responseGetEmployee.data)
                this.authStore.setRole(res.data.role)
                localStorage.setItem("role", res.data.role)
                localStorage.setItem("user", JSON.stringify(responseGetEmployee.data))
                alert(res.message)
                this.$emit('login')
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