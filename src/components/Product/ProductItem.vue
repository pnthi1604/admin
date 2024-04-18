<template>
    <tr>
        <td>
            <div class="product">
                <img :src="product.imageId.imageUrl" alt="Sản phẩm" width="100" height="100" class="product-img">
                <p class="product-name">
                    {{ shortForm(product.name) }}
                </p>
            </div>
        </td>
        <td>
            {{ product.price }} đồng
        </td>
        <td>
            {{ product.quantity }}
        </td>
        <td>
            {{ product.borrowingTime }} ngày
        </td>
        <td>
            {{ product.author }}
        </td>
        <td>
            {{ product.publisherId.name }}
        </td>
        <td>
            <btn nameBtn="Xem" styleBtn="btn-primary" @click="handleShowDetail" class="btn-func"></btn>
            <btn nameBtn="Xóa" styleBtn="btn-danger" @click="handleDelete" class="btn-func"></btn>
        </td>
    </tr>
</template>

<script>
import Btn from "@/components/Common/Btn.vue"

export default {
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    components: {
        Btn,
    },
    methods: {
        shortForm(text, maxLength) {
            if (!maxLength)
                maxLength = 20
            if (text.length > maxLength) {
                return text.substring(0, maxLength) + '...';
            }
            return text;
        },
        handleDelete() {
            this.$emit('deleteProduct', this.product);
        },
        handleShowDetail() {
            this.$emit('showDetail', this.product);

        }
    }
};
</script>

<style scoped>
.product {
    display: flex;
}

.product .product-name {
    margin-left: 10px;
    padding: 0;
    font-size: 14px;
}

.product .product-img {
    object-fit: cover;
    object-position: center;
    margin: 0;
    padding: 0;
}

.btn-func {
    width: 60px;
    margin-top: 4px;
    display: block;
}
</style>