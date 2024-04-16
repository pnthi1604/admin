<template>
    <div class="container-top">
        <greeting :title="title"></greeting>
        <btn class="btn-add-product" nameBtn="Thêm" @click="addProduct"></btn>
    </div>
    <div class="list-product">
        <product-card v-for="product in products" :key="product.id" :product="product"></product-card>
    </div>
</template>

<script>
import Greeting from '@/components/Utils/Greeting.vue';
import ProductCard from '@/components/Product/ProductCard.vue';
import productService from '@/services/product.service';
import Btn from '@/components/Common/Btn.vue';

export default {
    data() {
        return {
            title: 'Quản lý sản phẩm',
            products: []
        };
    },
    components: {
        Greeting,
        ProductCard,
        Btn,
    },
    mounted() {
        this.getProducts();
    },
    methods: {
        async getProducts() {
            this.products = (await productService.getProducts()).data
        },
        addProduct() {
            this.$router.push({ name: "addProductPage" });
        }
    },
}
</script>

<style scoped>
.container-top {
    text-align: center;
    padding: 20px;
}

.list-product {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
}

.btn-add-product {
    margin: 0 auto;
}
</style>