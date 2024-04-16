<template>
    <div class="container">
        <title-form :title="tilte"></title-form>
        <product-form @submit="handleSubmit"></product-form>
    </div>
</template>

<script>
import ProductForm from "@/components/Product/ProductForm.vue";
import TitleForm from "@/components/Common/TitleForm.vue";
import productService from "@/services/product.service";

export default {
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
            try {
                const response = await productService.createProduct(data);
                const dataResponse = response.data;
                console.log({dataResponse});
                alert(dataResponse.data.message);
            } catch (error) {
                alert(error.response.data.message);
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