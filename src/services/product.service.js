import createApiClient from "./api.service.js"

class ProductService {
    constructor(baseUrl = "/api/products") {
        this.api = createApiClient(baseUrl)
    }

    async getProducts() {
        return (await this.api.get("/")).data
    }

    async getProduct(id) {
        return (await this.api.get(`/${id}`)).data
    }

    async createProduct(product) {
        // return (await this.api.post("/", product)).data
        return this.api.post("/", product)
    }

    async updateProduct(id, product) {
        return (await this.api.put(`/${id}`, product)).data
    }

    async deleteProduct(id) {
        return (await this.api.delete(`/${id}`)).data
    }
}

export default new ProductService()
