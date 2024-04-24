<template>
    <div class="container-top">
        <greeting :title="title"></greeting>
        <title-form :title="titleDetailStatus"></title-form>
        <box-status-order v-for="orderStatus in orderStatuses" :key="orderStatus._id" :statusTitle="orderStatus.title" :createDate="orderStatus.createDate"></box-status-order>
        <title-form :title="titleDetailBill"></title-form>
        <completed-invoice :orderItems="orderItems" @showDetail="handleShowDetail"></completed-invoice>
    </div>
</template>

<script>
import Greeting from '@/components/Common/Greeting.vue';
import BoxStatusOrder from "@/components/Order/BoxStatusOrder.vue";
import TitleForm from "@/components/Common/TitleForm.vue";
import CompletedInvoice from '@/components/Order/CompletedInvoice.vue';
import imageService from '@/services/image.service';
import orderService from '@/services/order.service';

export default {
    components: {
        Greeting,
        BoxStatusOrder,
        TitleForm,
        CompletedInvoice,
    },
    data() {
        return {
            title: 'Chi tiết đơn hàng',
            orderStatuses: [],
            orderItems: [],
            titleDetailStatus: "Trạng thái đơn hàng",
            titleDetailBill: "Chi tiết hóa đơn",
            order: {},
        };
    },
    beforeMount: async function() {
        const id = this.$route.params.id;
        const res = await orderService.getOrder(id);
        console.log({
            res_order: res.data
        })
        if (res.status == "error") {
            alert(res.message);
            this.$router.push({
                name: "orderPage",
            });
            return
        }
        this.order = res.data;

        this.orderItems = this.order.orderItemsId;

        this.orderItems = await Promise.all(this.orderItems.map(async (orderItem) => {
            const res = await imageService.getImageById(orderItem.productId.imageId);
            if (res.status == "success") {
                orderItem.productId.imageId = {
                    ...orderItem.productId.imageId,
                    imageUrl: res.data.imageUrl,
                }
            }
            return orderItem;
        }));

        this.orderStatuses = this.order.orderStatuses;
        // sort by descending createDate
        this.orderStatuses.sort((a, b) => {
            return new Date(b.createDate) - new Date(a.createDate);
        });
    },
    methods: {
        handleShowDetail(product) {
            this.$router.push({
                name: "productDetailPage",
                params: {
                    id: product._id,
                },
            });
        },
    },
}
</script>

<style scoped>
.container-top {
    text-align: center;
    padding: 20px;
}
</style>