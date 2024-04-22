<template>
    <div class="">
        <div class="container-top">
            <greeting :title="title"></greeting>
            <btn nameBtn="Sửa" styleBtn="btn-warning" @click="handleEdit"></btn>
        </div>
        <product-detail :product="product"></product-detail>
    </div>
</template>

<script>
import Greeting from '@/components/Common/Greeting.vue';
import ProductDetail from '@/components/Product/ProductDetail.vue';
import Btn from "@/components/Common/Btn.vue";
import productService from '@/services/product.service';

export default {
    components: {
        Greeting,
        ProductDetail,
        Btn,
    },
    beforeMount: async function() {
        const res = await productService.getProductById(this.$route.params.id);
        if (res.status == "success")
            this.product = res.data;
        else {
            alert(res.message)
        }
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