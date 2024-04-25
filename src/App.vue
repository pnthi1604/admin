<template>
    <app-header :role="role" @login="handleLogin" @logout="handleLogout"></app-header>
    <div class="container">
        <router-view @login="handleLogin"></router-view>
    </div>
    <!-- <app-footer class="app-footer"></app-footer> -->
</template>

<script>
import AppHeader from "@/components/Common/AppHeader.vue"
import AppFooter from "@/components/Common/AppFooter.vue"
import useAuthStore from "@/stores/auth.store.js";
import { mapStores } from "pinia";

export default {
    computed: {
        ...mapStores(useAuthStore),
    },
    components: {
        AppHeader,
        AppFooter,
    },
    data() {
        return {
            adminRole: "admin",
            guestRole: "guest",
            role: "guest"
        }
    },
    methods: {
        handleLogin() {
            const role = localStorage.getItem("role")
            if (role == this.adminRole) {
                this.authStore.setRole(this.adminRole)
                const admin = JSON.parse(localStorage.getItem("user"))
                this.role = this.adminRole
                this.authStore.setUser(admin)
                this.$router.push({ name: "adminPage" })
                return
            }
            this.role = this.guestRole
            this.$router.push({ name: "login" })
        },
        handleLogout() {
            localStorage.removeItem("role")
            localStorage.removeItem("user")
            this.authStore.setRole(this.guestRole)
            this.role = this.guestRole
            if (this.$route?.meta?.requiresAuth) {
                this.$router.push({ name: "login" })
            }
        }
    }
}
</script>

<style>
.container {
    margin: 0 auto;
    margin-top: 12px;
    min-height: 1000px;
}

.app-footer {
    width: 1024px;
    bottom: 0;
}
</style>