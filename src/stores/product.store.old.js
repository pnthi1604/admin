import { defineStore } from 'pinia'
import imageService from '@/services/image.service.js'
import { Buffer } from 'buffer'
import publisherService from '@/services/publisher.service'

const productStore = defineStore('product', {
    state: () => ({
        products: [],
    }),
    getters: {
        getProducts() {
            return this.products
        }
    },
    actions: {
        renderImageUrl(image) {
            if (!image) return "@/assets/images/no-imag.jpg"
            return `data:${image.contentType};base64,${Buffer.from(image.data).toString("base64")}`
        },
        async handleProduct(product) {
            //render url img
            const responseImage = await imageService.getImageById(product.imageId)
            product.imageUrl = this.renderImageUrl(responseImage.data)

            //get name publisher
            const responsePublisher = await publisherService.getPublisherById(product.publisherId)
            product.publisher = responsePublisher?.data?.name  || "Chưa có thông tin"

            return product
        },
        async setProducts(products) {
            products = await Promise.all(products.map(async product => await this.handleProduct(product)))
            this.products = products
        },
        async addProduct(product) {
            this.products.push(await this.handleProduct(product))  
        },
        getProduct(id) {
            return this.products.find(p => p._id === id)
        },
        async updateProduct(product) {
            const index = this.products.findIndex(p => p._id === product._id)
            this.products[index] = await this.handleProduct(product)
        },
        deleteProduct(id) {
            const index = this.products.findIndex(p => p._id === id)
            this.products.splice(index, 1)
        },
        searchProduct(findString) {
            return this.products.filter(product => {
                return product.name.toLowerCase().includes(findString.toLowerCase())
                || product.publisher.toLowerCase().includes(findString.toLowerCase())
                || product.author.toLowerCase().includes(findString.toLowerCase())
            })
        }
    },
})

export default productStore