<template>
    <div class="container-top">
        <greeting :title="title"></greeting>
        <btn class="btn-add-product" nameBtn="Thêm" @click="addProduct"></btn>
    </div>
    <input-search @search="handleSearch" class="input-search"></input-search>
    <div class="row">
        <table class="table">
            <thead class="">
                <tr>
                    <th scope="col">Sản phẩm</th>
                    <th scope="col">Giá</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Hạn mượn</th>
                    <th scope="col">Tác giả</th>
                    <th scope="col">Nhà xuất bản</th>
                    <th scope="col">Chức năng</th>
                </tr>
            </thead>
            <tbody>
                <product-item v-for="product in filterProducts" :key="product.id" :product="product"
                    @deleteProduct="handleDeleteProduct" @showDetail="handleShowDetail">
                </product-item>
            </tbody>
        </table>
    </div>
</template>

<script>
import Greeting from '@/components/Common/Greeting.vue';
import productService from '@/services/product.service';
import Btn from '@/components/Common/Btn.vue';
import { mapStores } from 'pinia'
import useProductStore from "@/stores/product.store"
import ProductItem from '@/components/Product/ProductItem.vue';
import InputSearch from '@/components/Common/InputSearch.vue';

export default {
    computed: {
        ...mapStores(useProductStore),
    },
    data() {
        return {
            title: 'Quản lý sản phẩm',
            products: [],
            filterProducts: [],
            searchTerm: ""
        };
    },
    components: {
        Greeting,
        Btn,
        ProductItem,
        InputSearch
    },
    mounted() {
        this.getProducts();
    },
    methods: {
        handleSearch(searchTerm) {
            this.searchTerm = searchTerm
            this.filter()
        },
        filter() {
            if (!this.searchTerm || this.searchTerm == "")
                this.filterProducts = this.products;
            else
                this.filterProducts = this.productStore.searchProduct(this.searchTerm);
        },
        async getProducts() {
            if (this.productStore.getProducts.length == 0) {
                const res = await productService.getProducts();
                if (res.status == "success") {
                    await this.productStore.setProducts(res.data);
                    this.products = this.productStore.getProducts;
                } else {
                    alert(res.message);
                }
            }
            this.products = this.productStore.getProducts
            this.filterProducts = this.products;
        },
        addProduct() {
            this.$router.push({
                name: 'addProductPage',
            });
        },
        async handleDeleteProduct(product) {
            if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
                await this.deleteProduct(product._id);
                await this.getProducts()
                this.filter()
            }
        },
        async deleteProduct(id) {
            const res = await productService.deleteProduct(id);
            if (res.status == "success") {
                this.productStore.deleteProduct(id);
            } else {
                alert(res.message);
            }
        },
        handleShowDetail(product) {
            this.$router.push({
                name: 'productDetailPage',
                params: {
                    id: product._id
                }
            });
        }
    },
}
</script>

<style scoped>
.container-top {
    text-align: center;
    padding: 20px;
}

.input-search {
    margin-bottom: 12px;
}

.list-product {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
}

.btn-add-product {
    margin: 0 auto;
}
</style>