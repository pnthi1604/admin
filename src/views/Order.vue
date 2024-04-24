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
                    <!-- <order-item v-for="order in filterOrders" :key="order.__uniqueKey" :order="order"
                        @showDetail="handleShowDetail" @cancel="handleCancel" @confirm="handleConfirm">
                    </order-item> -->
                    <order-item v-for="order in filterOrders" :key="order.__uniqueKey" :order="order"
                        @showDetail="handleShowDetail" @update:order="handleUpdate">
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
        filterOrders() {
            let filterOrders = [];
            if (!this.searchTerm || this.searchTerm == "")
                filterOrders = this.orders;
            else
                filterOrders = this.orders.filter(order => {
                    return order.orderStatuses[order.orderStatuses.length - 1].title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                        order.phone.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                        order.fullname.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                        order.address.toLowerCase().includes(this.searchTerm.toLowerCase())
                });
            filterOrders = filterOrders.map(order => {
                order.__uniqueKey = new Date()
                return order
            })
            return filterOrders;
        },
    },
    data() {
        return {
            orders: [],
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
        },
        async reset() {
            await this.getOrders()
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
                // this.filterOrders = this.orders
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
        async handleUpdate({ order, status }) {
            if (status == 'Đã hủy') {
                if (window.confirm("Bạn có chắc chắn hủy đơn hàng này")) {
                    await this.handleConfirm({ order, status })
                }
            } else {
                await this.handleConfirm({ order, status })
            }
        },
        async handleConfirm({ order, status }) {
            const adminId = this.authStore.getUser._id;
            let res = await orderService.updateOrder({
                orderId: order._id,
                orderStatus: {
                    title: status,
                },
                adminId,
            })
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