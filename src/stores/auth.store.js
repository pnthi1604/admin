import { defineStore } from 'pinia'

const authStore = defineStore('auth', {
    state: () => ({
        role: "guest"
    }),
    getters: {
        getRole() {
            return this.role
        }
    },
    actions: {
        setRole(role) {
            this.role = role
        },
        removeRole() {
            this.role = "guest"
        }
    },
})

export default authStore