<template>
    <table class="table table-bordered">
        <thead>
            <tr>
                <th scope="col">
                    <p>
                        Sản phẩm
                    </p>
                </th>
                <!-- <th scope="col">
                    <p>
                        Ngày mượn
                    </p>
                </th>
                <th scope="col">
                    <p>
                        Ngày trả
                    </p>
                </th> -->
                <th scope="col">
                    <p>
                        Hạn mượn
                    </p>
                </th>
                <th scope="col">
                    <p>
                        Số lượng
                    </p>
                </th>
                <th scope="col">
                    <p>
                        Đơn giá
                    </p>
                </th>
                <th scope="col">
                    <p>
                        Thành tiền
                    </p>
                </th>
                <th scope="col">
                    <p>
                        Chức năng
                    </p>
                </th>
            </tr>
        </thead>
        <tbody>
            <completed-invoice-item v-for="orderItem in orderItems" :key="orderItem._id" :orderItem="orderItem" @showDetail="handleShowDetail"></completed-invoice-item>
            <tr>
                <td colspan="4">
                    <p class="total-value">
                        Tổng thanh toán
                    </p>
                </td>
                <td>
                    <p class="total-value">
                        {{ totalValue }}
                    </p>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import CompletedInvoiceItem from "@/components/Order/CompletedInvoiceItem.vue";

export default {
    components: {
        CompletedInvoiceItem,
    },
    props: {
        orderItems: {
            type: Array,
            required: true,
        }
    },
    emits: ['showDetail'],
    data() {
        return {
        }
    },
    computed: {
        totalValue() {
            return this.orderItems.reduce((total, orderItem) => {
                return total + orderItem.quantity * orderItem.price;
            }, 0);
        }
    },
    methods: {
        handleShowDetail(orderItem) {
            this.$emit("showDetail", orderItem.productId);
        }
    }
}
</script>

<style scoped>
p {
    margin: 0;
    padding: 0;
}

.total-value {
    font-weight: bold;
}
</style>