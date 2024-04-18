<template>
    <div class="container">
        <title-form :title="title"></title-form>
        <product-form @submit="handleSubmit"></product-form>
    </div>
</template>

<script>
import ProductForm from "@/components/Product/ProductForm.vue";
import TitleForm from "@/components/Common/TitleForm.vue";
import productService from "@/services/product.service";
import imageService from "@/services/image.service"
import { mapStores } from 'pinia'
import useProductStore from "@/stores/product.store"

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
            title: "Thêm sản phẩm"
        }
    },
    methods: {
        async handleSubmit(data) {
            const { file, ...productData } = data;
            const formData = new FormData();
            formData.append("file", file);
            const resImage = await imageService.uploadImage(formData)
            if (resImage.status === "error") {
                alert(resImage.message)
            } else {
                productData.imageId = resImage.data._id
                const resProduct = await productService.createProduct(productData)
                alert(resProduct.message)
                if (resProduct.status == "success") {
                    await this.productStore.addProduct(resProduct.data)
                    this.$router.push({ name: "productPage" })
                }
            }
        }
    }
}
</script>

<style scoped>
.container {
    max-width: 400px;
}
</style>