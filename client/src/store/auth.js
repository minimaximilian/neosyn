import { defineStore } from 'pinia'
import { ref, inject } from 'vue'

export const useAuthStore = defineStore('auth', () => {
    const isAuthenticated = ref(localStorage.getItem("token") != null)

    const axios = inject("AXIOS_INSTANCE");

    async function login(un, pw) {
        try {
            let res = await axios.post("/auth/login", {
                username: un,
                password: pw
            })
    
            let token = res.data.token;
            localStorage.setItem('token', token)
            isAuthenticated.value = true

        } catch (error) {
            console.error("Login failed", error)
        }
    }

    async function logout() {
        try {
            let res = await axios.post("/auth/logout")
        } catch (error) {
            console.error("Logout failed", error)
        } finally {
            localStorage.removeItem("token")
            isAuthenticated.value = false
        }
    }

    return {
        isAuthenticated,
        login,
        logout
    }
})