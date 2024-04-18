<template>
    <form enctype="multipart/form-data">
        <div class="form-group">
            <label for="name">Tên nhà xuất bản</label>
            <input type="text" class="form-control" id="name" v-model="name">
        </div>

        <div class="form-group">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" v-model="email">
        </div>

        <div class="form-group">
            <label for="address">Địa chỉ</label>
            <input type="text" class="form-control" id="address" v-model="address">
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
        publisher: {
            type: Object,
        }
    },
    data() {
        return {
            name: "Tên nhà xuất bản",
            email: "nhaxuatban@gmail.com",
            address: "Xuan Khanh, Ninh Kieu, Can Tho",
        };
    },
    components: {
        Btn,
    },
    created() {
        if (this.publisher) {
            this.name = this.publisher.name;
            this.email = this.publisher.email;
            this.address = this.publisher.address;
            if (this.publisher._id) {
                this._id = this.publisher._id;
            }
        }
    },
    methods: {
        async handleSubmit(evnet) {
            evnet.preventDefault();
            const data = {
                name: this.name,
                email: this.email,
                address: this.address,
            };
            if (this._id) {
                data._id = this._id;
            }
            this.$emit("submit", data);
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
</style>