<template>
    <div class="container-top">
        <greeting :title="title"></greeting>
        <btn class="btn-add-product" nameBtn="Thêm" @click="addPublisher"></btn>
    </div>
    <input-search @search="handleSearch" class="input-search"></input-search>
    <div class="container-publisher-item">
        <publisher-detail 
            class="publisher-detail" 
            v-for="publisher in filterPublishers" 
            :item="publisher" 
            :key="publisher._id"
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
        };
    },
    components: {
        Greeting,
        Btn,
        InputSearch,
        PublisherDetail,
    },
    mounted() {
        this.getPublishers()
    },
    methods: {
        handleSearch(searchTerm) {
            if (!searchTerm || searchTerm == "")
                this.filterPublishers = this.publishers;
            else
                this.filterPublishers = this.publisherstore.searchProduct(searchTerm);
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
                query: {
                    ...publisher
                }
            });
        },
        async handleDelete(publisher) {
            if (window.confirm("Bạn có chắc chắn muốn xóa nhà xuất bản này?")) {
                const resDeletePublisher = await publisherService.deletePublisher(publisher._id)
                if (resDeletePublisher.status == "error")
                    alert(resDeletePublisher.message)
                this.publishers = await this.getPublishers()
            }
        },
        handleSearch(findString) {
            this.filterPublishers = this.publishers.filter(publisher => {
                return publisher.name.toLowerCase().includes(findString.toLowerCase())
                || publisher.address.toLowerCase().includes(findString.toLowerCase())
            })
        }
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