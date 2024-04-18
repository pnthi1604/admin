<template>
    <div class="container">
        <title-form :title="title"></title-form>
        <publisher-form @submit="handleSubmit" :publisher="publisher"></publisher-form>
    </div>
</template>

<script>
import TitleForm from "@/components/Common/TitleForm.vue";
import PublisherForm from "@/components/Publisher/PublisherForm.vue";
import publisherService from '@/services/publisher.service';

export default {
    components: {
        TitleForm,
        PublisherForm,
    },
    data() {
        return {
            title: "Thêm nhà xuất bản",
            publisher: {
                name: "Tên nhà xuất bản",
                email: "nhaxuatban@gmail.com",
                address: "Xuan Khanh, Ninh Kieu, Can Tho",
            }
        }
    },
    created() {
        if (this.$route?.params?.id) {
            this.title = "Cập nhật nhà xuất bản"
            this.publisher = {...this.$route.query} || this.publisher
        }
    },
    methods: {
        async handleSubmit(data) {
            let res = null
            if (!this.$route?.params?.id) {
                res = await publisherService.createPublisher(data);
                alert(res.message)
            } else {
                res = await publisherService.updatePublisher(data._id, data);
                alert(res.message);
            }
            if (res.status == "success") {
                this.$router.push({
                    name: 'publisherPage',
                });
            }
        }
    }
}
</script>

<style scoped>
.container {
    max-width: 400px;
}
</style>