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
import ProductCard from '@/components/Product/ProductDetail.vue';
import productService from '@/services/product.service';
import Btn from '@/components/Common/Btn.vue';
import { mapStores } from 'pinia'
import useProductStore from "@/stores/product.store.old"

export default {
    computed: {
        ...mapStores(useProductStore)
    },
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
            if (this.productStore.getProducts.length == 0) {
                const res = await productService.getProducts();
                if (res.status == "success") {
                    this.productStore.setProducts(res.data);
                    this.products = this.productStore.getProducts;
                } else {
                    alert(res.message);
                }
            } else {
                this.products = this.productStore.getProducts
            }
            console.log({
                "products": this.products
            })
        },
        addProduct() {
            this.$router.push({ name: 'addProductPage' });
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