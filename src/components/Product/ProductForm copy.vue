<template>
    <form enctype="multipart/form-data">
        <div class="form-group">
            <label for="name">Tên sản phẩm</label>
            <input type="text" class="form-control" id="name" v-model="name">
        </div>

        <div class="form-group">
            <label for="image">Upload Image</label>
            <input type="file" ref="file" @change="onSelect"/>
            <div class="message">
                <p>{{ message }}</p>
            </div>
            <img v-if="productImageUrl" :src="productImageUrl" alt="" class="image-loaded"/>
        </div>

        <div class="form-group">
            <label for="price">Giá</label>
            <input type="text" class="form-control" id="price" v-model="price">
        </div>

        <div class="form-group">
            <label for="quantity">Số lượng</label>
            <input type="text" class="form-control" id="quantity" v-model="quantity">
        </div>

        <div class="form-group">
            <label for="publishYear">Năm xuất bản</label>
            <input type="text" class="form-control" id="publishYear" v-model="publishYear">
        </div>

        <div class="form-group">
            <label for="publisherId">ID nhà xuất bản</label>
            <input type="text" class="form-control" id="publisherId" v-model="publisherId">
        </div>

        <div class="form-group">
            <label for="author">Tên tác giả</label>
            <input type="text" class="form-control" id="author" v-model="author">
        </div>

        <div class="form-group">
            <label for="describe">Mô tả</label>
            <textarea class="form-control" id="describe" v-model="description"></textarea>
        </div>

        <div class="form-group">
            <label for="duration">Số ngày mượn</label>
            <input type="numbser" class="form-control" id="duration" v-model="borrowingTime">
        </div>
        <div class="submit-form">
            <btn @submit="handleSubmit"></btn>
        </div>
    </form>
</template>

<script>
import Btn from "@/components/Common/Btn.vue";

export default {
    props: {
        product: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            name: "Tên sách",
            price: 20000,
            quantity: 10,
            publishYear: 2024,
            publisherId: "6606ddfff8ad64934b223c2d",
            borrowingTime: 10,
            description: "Mở cánh cửa vào một thế giới mới với cuốn sách này. Nó đưa bạn vào một hành trình đầy kỳ bí, nơi những nhân vật sống động và câu chuyện sâu sắc chờ đợi. Từ trang đầu tiên, bạn sẽ bị cuốn hút và không thể buông xuôi cho đến khi đọc hết.",
            author: "Nguyễn Nhật Ánh",
            file: null,
            message: "",
            productImageUrl: "",
            imageId: "",
        }
    },
    components: {
        Btn,
    },
    created() {
        if (this.product) {
            this.name = this.product.name;
            this.price = this.product.price;
            this.quantity = this.product.quantity;
            this.publishYear = this.product.publishYear;
            this.publisherId = this.product.publisherId;
            this.borrowingTime = this.product.borrowingTime;
            this.description = this.product.description;
            this.author = this.product.author;
            this.productImageUrl = this.product.imageUrl;
            this.imageId = this.product.imageId;
        }
    },
    methods: {
        onSelect() {
            const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
            const file = this.$refs.file.files[0];
            this.file = file;
            if (!allowedTypes.includes(file.type)) {
                this.message = "Loại file không đúng, vui lòng tải lại file!";
                return;
            }
            if (file.size > 10000000) {
                this.message = "Kích thước file tối đa 1000kb, vui lòng tải lại file!";
                return;
            }
            const theReader = new FileReader();
            theReader.onloadend = async () => {
                this.productImageUrl = await theReader.result;
            };
            theReader.readAsDataURL(file);
        },
        async handleSubmit(evnet) {
            evnet.preventDefault();
            this.$emit("submit", {
                name: this.name,
                price: this.price,
                quantity: this.quantity,
                publishYear: this.publishYear,
                publisherId: this.publisherId,
                borrowingTime: this.borrowingTime,
                description: this.description,
                author: this.author,
                imageId: this.imageId,
                file: this.file,
            });
        },
    },
}

</script>

<style scoped>
form {
    margin-top: 24px;
}

.submit-form {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.image-loaded {
    width: 200px;
    height: 200px;
}
</style>