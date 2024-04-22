<template>
    <div class="">
        <div class="container-top">
            <greeting :title="title"></greeting>
        </div>
        <input-search @search="handleSearch" class="input-search" :searchBy="searchBy"></input-search>
        <div class="row">
            <table class="table table-bordered">
                <thead class="">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Đơn hàng</th>
                        <th scope="col">Tổng thanh toán</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Chức năng</th>
                    </tr>
                </thead>
                <tbody>
                    <order-item v-for="order in filterOrders" :key="order.__uniqueKey" :order="order"
                        @showDetail="handleShowDetail" @cancel="handleCancel" @confirm="handleConfirm">
                    </order-item>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import Greeting from "@/components/Common/Greeting.vue";
import OrderItem from "@/components/Order/OrderItem.vue";
import orderService from '@/services/order.service';
import useAuthStore from '@/stores/auth.store';
import { mapStores } from 'pinia';
import InputSearch from "@/components/Common/InputSearch.vue";

export default {
    computed: {
        ...mapStores(useAuthStore),
    },
    data() {
        return {
            orders: [],
            filterOrders: [],
            title: 'Đơn hàng',
            searchBy: "Tìm kiếm theo trạng thái đơn hàng, số điện thoại khách hàng, tên khách hàng, địa chỉ",
            searchTerm: "",
        };
    },
    components: {
        Greeting,
        OrderItem,
        InputSearch,
    },
    beforeMount: async function() {
        await this.getOrders();
    },
    methods: {
        handleSearch(searchTerm) {
            this.searchTerm = searchTerm
            this.filter()
        },
        filter() {
            if (!this.searchTerm || this.searchTerm == "")
                this.filterOrders = this.orders;
            else
                this.filterOrders = this.orders.filter(order => {
                    order.__uniqueKey = new Date()
                    return order.orderStatuses[order.orderStatuses.length - 1].title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                        order.phone.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                        order.fullname.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                        order.address.toLowerCase().includes(this.searchTerm.toLowerCase())
                });
            this.filterOrders = this.filterOrders.map(order => {
                order.__uniqueKey = new Date()
                return order
            })
        },
        async reset() {
            await this.getOrders()
            this.filter()
        },
        async getOrders() {
            const userId = this.authStore.getUser._id;
            const res = await orderService.getAll()
            if (res.status == "success") {
                this.orders = res.data;
                // sort orders by the latest orderStatuses
                this.orders.sort((a, b) => {
                    const dateA = a.orderStatuses[a.orderStatuses.length - 1].createDate;
                    const dataB = b.orderStatuses[b.orderStatuses.length - 1].createDate;
                    // sort by descending order
                    return new Date(dataB) - new Date(dateA);
                });
                for (let i = 0; i < this.orders.length; i++) {
                    this.orders[i].index = i + 1;
                }
                this.orders = res.data;
                this.filterOrders = this.orders
            } else {
                alert(res.message);
            }
        },
        handleShowDetail(order) {
            this.$router.push({
                name: "orderDetailPage",
                params: {
                    id: order._id,
                },
            });
        },
        async handleCancel(order) {
            if (window.confirm("Bạn có chắc chắn hủy đơn hàng này")) {
                const adminId = this.authStore.getUser._id;
                const res = await orderService.updateOrder({
                    orderId: order._id,
                    orderStatus: {
                        title: "Đã hủy",
                    },
                    adminId,
                })
                if (res.status == "error")
                    alert(res.message)
                else {
                    this.orders = this.orders.map((item) => {
                        if (item._id == order._id) {
                            console.log({ item })
                            item.orderStatuses.push(
                                res.data.orderStatuses[res.data.orderStatuses.length - 1]
                            );
                            item.__uniqueKey = Date.now();
                        }
                        return item;
                    });
                }
                await this.reset()
            }
        },
        async handleConfirm({ order, status }) {
            const adminId = this.authStore.getUser._id;
            let res = null;
            if (status == "Đang xử lý") {
                res = await orderService.updateOrder({
                    adminId,
                    orderId: order._id,
                    orderStatus: {
                        title: "Đang giao hàng",
                    },
                })
            } else if (status == "Đang giao hàng") {
                res = await orderService.updateOrder({
                    orderId: order._id,
                    orderStatus: {
                        title: "Đã nhận hàng",
                    },
                    adminId,
                })
            } else if (status == "Yêu cầu hủy đơn") {
                if (window.confirm("Bạn có chắc chắn từ chối yêu cầu hủy đơn này")) {
                    res = await orderService.updateOrder({
                        orderId: order._id,
                        orderStatus: {
                            title: "Đang giao hàng",
                        },
                        adminId,
                    })
                }
            }
            if (res == null)
                return
            if (res.status == "error")
                alert(res.message)
            else {
                this.orders = this.orders.map((item) => {
                    if (item._id == order._id) {
                        item.orderStatuses.push(
                            res.data.orderStatuses[res.data.orderStatuses.length - 1]
                        );
                        item.__uniqueKey = Date.now();
                    }
                    return item;
                });
            }
            await this.reset()
        }
    },
}
</script>

<style scoped>
.container-top {
    text-align: center;
    padding: 20px;
}

.table {
    text-align: center;
}

.input-search {
    margin-bottom: 12px;
}
</style>