<template>
    <div class="container-top">
        <greeting :title="title"></greeting>
        <btn class="btn-add-product" nameBtn="Thêm" @click="addPublisher"></btn>
    </div>
    <input-search @search="handleSearch" class="input-search" :searchBy="searchBy"></input-search>
    <div class="container-publisher-item">
        <publisher-detail 
            class="publisher-detail" 
            v-for="publisher in filterPublishers" 
            :item="publisher" 
            :key="publisher.__uniqueKey || publisher._id"
            @update="handleUpdate"
            @delete="handleDelete"
            >
        </publisher-detail>
    </div>
</template>

<script>
import Greeting from '@/components/Common/Greeting.vue';
import Btn from '@/components/Common/Btn.vue';
import InputSearch from '@/components/Common/InputSearch.vue';
import PublisherDetail from '@/components/Publisher/PublisherDetail.vue';
import publisherService from '@/services/publisher.service';

export default {
    data() {
        return {
            title: 'Quản lý nhà xuất bản',
            publishers: [],
            filterPublishers: [],
            searchBy: "Tìm kiếm theo tên, địa chỉ",
            searchTerm: "",
        };
    },
    components: {
        Greeting,
        Btn,
        InputSearch,
        PublisherDetail,
    },
    beforeMount: async function() {
        await this.getPublishers()
    },
    methods: {
        handleSearch(searchTerm) {
            this.searchTerm = searchTerm
            this.filter()
        },
        filter() {
            if (!this.searchTerm || this.searchTerm == "")
                this.filterPublishers = this.publishers;
            else
                this.filterPublishers = this.publishers.filter(product => {
                    return product.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                        product.address.toLowerCase().includes(this.searchTerm.toLowerCase())
                });
            this.filterPublishers = this.filterPublishers.map(product => {
                product.__uniqueKey = new Date()
                return product
            })
        },
        async reset() {
            await this.getPublishers()
            this.filter()
        },
        async getPublishers() {
            const res = await publisherService.getPublishers();
            if (res.status == "error") {
                alert(res.message);
                return;
            } else {
                this.publishers = res.data;
                this.filterPublishers = this.publishers;
            }
            this.filterPublishers = this.publishers;
        },
        addPublisher() {
            this.$router.push({
                name: 'addPublisherPage',
            });
        },
        handleUpdate(publisher) {
            this.$router.push({
                name: 'updatePublisherPage',
                params: {
                    id: publisher._id,
                },
            });
        },
        async handleDelete(publisher) {
            if (window.confirm("Bạn có chắc chắn muốn xóa nhà xuất bản này?")) {
                const resDeletePublisher = await publisherService.deletePublisher(publisher._id)
                if (resDeletePublisher.status == "error")
                    alert(resDeletePublisher.message)
                await this.reset()
            }
        },
    },
}
</script>

<style scoped>
.container-top {
    text-align: center;
    padding: 20px;
}

.container-publisher-item {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
}

.publisher-detail {
    padding: 12px;
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