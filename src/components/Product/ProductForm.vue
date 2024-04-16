<template>
    <form>
        <div class="form-group">
            <label for="name">Tên sản phẩm</label>
            <input type="text" class="form-control" id="name" v-model="name">
        </div>

        <div class="form-group">
            <label for="image">Upload Image</label>
            <input type="file" @change="handleFileChange" id="image" name="image" value="" required />
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
            <label for="publishingYear">Năm xuất bản</label>
            <input type="text" class="form-control" id="publishingYear" v-model="publishingYear">
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
            <textarea class="form-control" id="describe" v-model="describe"></textarea>
        </div>

        <div class="form-group">
            <label for="duration">Số ngày mượn</label>
            <input type="numbser" class="form-control" id="duration" v-model="duration">
        </div>
        <div class="submit-form">
            <btn @click="handleSubmit"></btn>
        </div>
    </form>
</template>

<script>
import Btn from "@/components/Common/Btn.vue";

export default {
    data() {
        return {
            name: "Tên sách",
            price: 20000,
            quantity: 10,
            publishingYear: 2024,
            publisherId: "6606ddfff8ad64934b223c2d",
            duration: 10,
            describe: "Sách hay nhất năm",
            author: "Nguyễn Nhật Ánh",
            fileBuffer: null,
        }
    },
    components: {
        Btn,
    },
    methods: {
        handleFileChange(event) {
            const file = event.target.files[0];
            console.log(file);
            const reader = new FileReader();
            reader.onload = () => {
                this.fileBuffer = Buffer.from(reader.result);
            };
        },
        // handleFileUpload(event) {
        //     const file = event.target.files[0];
        //     if (!file) return;

        //     const reader = new FileReader();
        //     reader.onload = () => {
        //         const imageData = reader.result;
        //         this.handleImageUpload(imageData);
        //     };
        //     reader.readAsDataURL(file);
        // },
        // handleImageUpload(imageData) {
        //     this.imageData = imageData;
        // },
        handleSubmit() {
            console.log(this.fileBuffer);
            this.$emit("submit", {
                name: this.name,
                price: parseInt(this.price),
                quantity: parseInt(this.quantity),
                publishingYear: parseInt(this.publishingYear),
                publisherId: this.publisherId,
                image: {
                    data: this.fileBuffer,
                    contentType: "image/png",
                },
            });
        }
    }

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
</style>