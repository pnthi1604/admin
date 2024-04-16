<template>
    <div class="product-card">
        <img src="./Decision_Tree.jpg" alt="Product Image" class="product-image">
        <div class="product-info">
            <h2 class="product-name">{{ product.name }}</h2>
            <p class="product-price">{{ product.price }}</p>
        </div>
        <button class="btn-add">
            Thêm giỏ hàng
        </button>
    </div>
</template>

<script>
export default {
    name: 'ProductCard',
    props: {
        product: {
            type: Object,
            required: true
        }
    },
    methods: {
        getImageUrl(image) {
            console.log({ image });
            if (image && image.data && image.contentType) {
                const base64Image = btoa(
                    new Uint8Array(image.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ''
                    )
                );

                return `data:${image.contentType};base64,${base64Image}`;
            }
            return './Decision_Tree.jpg'
        }

    }
};
</script>

<style scoped>
.product-card {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 4px;
    margin-bottom: 10px;
    text-align: center;
    width: 100%;
    box-shadow: 3px 3px 10px #e0e0e0;
}

.product-card:hover {
    box-shadow: 0px 4px 18px #a9a9a9;
    cursor: pointer;
}

.product-info .product-name {
    font-size: 24px;
}

.product-info .product-price,
.product-info {
    font-size: 16px;
}

.product-quantity .btn-adjust-number {
    background-color: green;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 8px;
}

.product-image {
    width: 100%;
    height: 60%;
    border-radius: 5px;
}

.btn-add {
    background-color: green;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    height: 10%;
}

.btn-add:hover {
    background-color: darkgreen;
}
</style>