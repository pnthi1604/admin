<template>
    <div class="">
        <div class="file">
            <form enctype="multipart/form-data">
                <div class="fields">
                    <label for="a">Upload File</label><br />
                    <input type="text" name="a"/>
                </div>
                <div class="fields">
                    <label>Upload File</label><br />
                    <input type="file" ref="file" @change="onSelect" />
                </div>
                <div class="fields">
                    <button @click="submit">Submit</button>
                </div>
                <div class="message">
                    <h5>{{ message }}</h5>
                </div>
            </form>
        </div>
        <button @click="handleShowImage">xem ảnh</button>
        <img :src="imageUrl" alt="chưa có gì hết chơn">
    </div>
</template>

<script>
import axios from "axios";
import { Buffer } from "buffer";
export default {
    name: "FileUpload",
    data() {
        return {
            file: "",
            message: "",
            imageUrl: "",
        };
    },
    methods: {
        onSelect() {
            const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
            const file = this.$refs.file.files[0];
            this.file = file;
            if (!allowedTypes.includes(file.type)) {
                this.message = "Filetype is wrong!!";
            }
            if (file.size > 10000000) {
                this.message = "Too large, max size allowed is 1000kb";
            }
        },
        async submit(event) {
            event.preventDefault();
            const formData = new FormData();
            formData.append("file", this.file);
            console.log({formData})
            try {
                await axios.post("http://localhost:3000/api/images", formData);
                this.message = "Uploaded!";
            } catch (err) {
                console.log(err);
                // this.message = err.response.data.error;
                // console.log(this.message)
            }
        },
        async handleShowImage() {
            try {
                const res = await axios.get("http://localhost:3000/api/images/661e962a1ea7a567e31c2728");
                const buffer = res.data.data
                const mimeType = res.data.mimeType
                this.imageUrl = `data:${mimeType};base64,${Buffer.from(buffer).toString("base64")}`
                console.log({ imageUrl: this.imageUrl });
                console.log({ buffer });
            } catch (err) {
                console.log(err);
            }
        },
    },
};
</script>

<style>
</style>