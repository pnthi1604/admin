<template>
    <div class="">
        <div class="container-top">
            <greeting :title="title"></greeting>
            <btn class="btn-add-product" nameBtn="Thêm" @click="addProduct"></btn>
        </div>
        <input-search @search="handleSearch" class="input-search" :searchBy="searchBy"></input-search>
        <div class="row">
            <table class="table table-bordered">
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
                    <product-item v-for="product in filterProducts" :key="product.__uniqueKey || product._id" :product="product"
                        @deleteProduct="handleDeleteProduct" @showDetail="handleShowDetail">
                    </product-item>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Greeting from '@/components/Common/Greeting.vue';
import productService from '@/services/product.service';
import Btn from '@/components/Common/Btn.vue';
import ProductItem from '@/components/Product/ProductItem.vue';
import InputSearch from '@/components/Common/InputSearch.vue';

export default {
    data() {
        return {
            title: 'Quản lý sản phẩm',
            products: [],
            filterProducts: [],
            searchTerm: "",
            searchBy: "Tìm kiếm theo sản phẩm, tác giả, nhà xuất bản"
        };
    },
    components: {
        Greeting,
        Btn,
        ProductItem,
        InputSearch
    },
    beforeMount: async function() {
        await this.getProducts();
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
                this.filterProducts = this.products.filter(product => {
                    return product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                        product.author.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                        product.publisherId.name.toLowerCase().includes(this.searchTerm.toLowerCase())
                });
            this.filterProducts = this.filterProducts.map(product => {
                product.__uniqueKey = new Date()
                return product
            })
        },
        async getProducts() {
            const res = await productService.getProducts();
            if (res.status == "error") {
                alert(res.message);
                return
            }
            this.products = res.data;
            // reverse this.products
            this.products = this.products.reverse();
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
            if (res.status == "error")
                alert(res.message)
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