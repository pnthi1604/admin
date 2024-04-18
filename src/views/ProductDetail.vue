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
import Btn from "@/components/Common/Btn.vue";

export default {
    components: {
        Greeting,
        ProductDetail,
        Btn,
    },
    created() {
        this.product = JSON.parse(this.$route.query.data)
    },
    data() {
        return {
            title: 'Chi tiết sản phẩm',
            product: ""
        }
    },
    methods: {
        handleEdit() {
            this.$router.push({
                name: 'updateProductPage',
                params: {
                    id: this.product._id
                },
                query: {
                    data: JSON.stringify(this.product)
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