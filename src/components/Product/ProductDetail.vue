<template>
    <div class="product-detail">
        <div class="product-item">
            <img v-lazy="product?.imageId?.imageUrl || ''" alt="product.name" class="product-image" />
            <div class="product-info">
                <h4 class="product-name">{{ product?.name }}</h4>
                <p class="attribute-product">Giá: <span class="font-weight-bold">{{ product?.price }}đ</span>
                </p>
                <p class="attribute-product">Số lượng: {{ product?.quantity }}</p>
                <p class="attribute-product">Tác giả: {{ product?.author }}</p>
                <p class="attribute-product">Thời hạn mượn: <span class="font-weight-bold">{{
                product?.borrowingTime }} ngày</span></p>
                <p class="attribute-product">Mô tả: {{ product?.description }}</p>
                <p class="attribute-product">Nhà xuất bản: {{ product?.publisherId?.name }}</p>
                <p class="attribute-product">Năm xuất bản: {{ product?.publishYear }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    methods: {
    }
};
</script>

<style scoped>
.product-detail {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 4px;
    margin-bottom: 10px;
    width: 100%;
    min-height: 200px;
    box-shadow: 3px 3px 10px #e0e0e0;
}

.product-item {
    display: grid;
    grid-template-columns: 0.5fr 1fr;
}

.product-item .product-image {
    width: 200px;
    min-height: 200px;
    object-fit: cover;
}

.product-item .product-name {
    font-size: 20px;
}

.product-item .attribute-product {
    font-size: 14px;
    margin: 0;
    padding: 0;
}
</style>