import createApiClient from "./api.service.js"

class AuthService {
    constructor(baseUrl = "/api") {
        this.api = createApiClient(baseUrl)
    }
    async login(user) {
        return (await this.api.post("/login", user))
    }
    async register(user) {
        return (await this.api.post("/register", user)).data
    }
    async logout() {
        return (await this.api.post("/logout")).data
    }
}

export default new AuthService()