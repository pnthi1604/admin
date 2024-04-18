import { createWebHistory, createRouter } from "vue-router";
import authRoutes from "./authRoutes.js";
import useAuthStore from "@/stores/auth.store.js";
import adminRoutes from "./adminRoutes.js";

const routes = [
    ...authRoutes,
    ...adminRoutes,
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    if (!to.meta.requiresAuth) {
        return next()
    }

    const authStore = useAuthStore()
    const role = authStore.getRole
    if (role != to.meta.role) {
        return next({ name: 'login' })
    }
    return next()
});

export default router;