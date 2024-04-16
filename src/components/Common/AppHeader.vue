<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <nav-item :title="'Trang chủ'" :routerName="'adminPage'" class="navbar-brand"></nav-item>
        <nav-item :title="'Sản phẩm'" :routerName="'productPage'" class="navbar-brand"></nav-item>
        <nav-item :title="'Nhà xuất bản'" :routerName="'publisherPage'" class="navbar-brand"></nav-item>
        <nav-item :title="'Duyệt đơn hàng'" :routerName="'orderPage'" class="navbar-brand"></nav-item>
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown"
                aria-expanded="false">
            </button>
            <div class="dropdown-menu">
                <router-link v-if="role==guestRole" class="dropdown-item" :to="{name: 'login'}">Đăng nhập</router-link>
                <router-link v-if="role==adminRole" class="dropdown-item" @click="logout" :to="{name: 'login'}">Đăng xuất</router-link>
            </div>
        </div>
    </nav>
</template>

<script>
import NavItem from "@/components/Utils/NavItem.vue";
import useAuthStore from "@/stores/auth.store.js";
import { mapStores } from "pinia";

export default {
    computed: {
        ...mapStores(useAuthStore),
        role() {
            return this.authStore.getRole
        }
    },
    components: {
        NavItem,
    },
    data() {
        return {
            guestRole: "guest",
            adminRole: "admin"            
        }
        
    },
    methods: {
        logout() {
            this.authStore.setRole(this.guestRole)
        }
    }
}
</script>

<style scoped>
.dropdown {
    margin-left: auto;
}
</style>
