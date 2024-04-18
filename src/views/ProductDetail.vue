<template>
    <div class="container-top">
        <greeting :title="title"></greeting>
        <btn nameBtn="Sửa" styleBtn="btn-warning" @click="handleEdit"></btn>
    </div>
    <product-detail :product="product"></product-detail>
</template>

<script>
import Greeting from '@/components/Common/Greeting.vue';
import ProductDetail from '@/components/Product/ProductDetail.vue';
import { mapStores } from 'pinia';
import useProductStore from "@/stores/product.store";
import Btn from "@/components/Common/Btn.vue";

export default {
    computed: {
        ...mapStores(useProductStore)
    },
    components: {
        Greeting,
        ProductDetail,
        Btn,
    },
    created() {
        this.getProduct(this.$route.params.id);
    },
    data() {
        return {
            title: 'Chi tiết sản phẩm',
            product: ""
        }
    },
    methods: {
        getProduct(id) {
            this.product = this.productStore.getProduct(id);
        },
        handleEdit() {
            console.log({
                "this.product": this.product,
            });
            this.$router.push({
                name: 'updateProductPage',
                params: {
                    id: this.product._id
                }
            });
        },
    },
};
</script>

<style scoped>
.container-top {
    text-align: center;
    padding: 20px;
}
</style>