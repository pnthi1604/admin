<template>
    <div class="container">
        <title-form :title="title"></title-form>
        <product-form @submit="handleSubmit" :product="product"></product-form>
    </div>
</template>

<script>
import ProductForm from "@/components/Product/ProductForm.vue";
import TitleForm from "@/components/Common/TitleForm.vue";
import productService from "@/services/product.service";
import imageService from "@/services/image.service"
import { mapStores } from 'pinia'
import useProductStore from "@/stores/product.store.old"

export default {
    computed: {
        ...mapStores(useProductStore)
    },
    components: {
        ProductForm,
        TitleForm
    },
    data() {
        return {
            title: "Cập nhật sản phẩm",
            product: null
        }
    },
    created() {
        this.product = this.productStore.getProduct(this.$route.params.id)
    },
    methods: {
        async handleSubmit(data) {
            const { file, imageUrl, publisher, ...productData } = data;
            if (file) {
                const formData = new FormData();
                formData.append("file", file);
                const resImage = await imageService.uploadImage(formData)
                if (resImage.status === "error") {
                    alert(resImage.message)
                    return
                }
                // delete old image
                await imageService.deleteImage(productData.imageId)
                productData.imageId = resImage.data._id
            }
            const resProduct = await productService.updateProduct(productData._id, productData)
            if (resProduct.status == "success") {
                await this.productStore.updateProduct(resProduct.data)
                this.$router.push({ name: "productPage" })
            }
            alert(resProduct.message)
        }
    }
}
</script>

<style scoped>
.container {
    max-width: 400px;
}
</style>