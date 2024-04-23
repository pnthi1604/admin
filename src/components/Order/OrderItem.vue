<template>
    <tr>
        <th scope="row"> {{ order.index }} </th>
        <td class="info-customer">
            <p>Khách hàng: {{ order.fullname }}</p>
            <p>Số điện thoại: {{ order.phone }}</p>
            <p>Địa chỉ: {{ order.address }}</p>
        </td>
        <td>
            <p>{{ totalPrice }} đồng</p>
        </td>
        <td>
            <p>{{ status }}</p>
        </td>
        <td class="func">
            <btn nameBtn="Xem" styleBtn="btn-primary" @click="handleShowDetail" class="btn-func"></btn>
            <btn v-if="['Đang xử lý', 'Đang giao hàng'].includes(status)" nameBtn="Xác nhận" styleBtn="btn-warning" @click="handleConfirm" class="btn-func"></btn>
            <btn v-if="['Đang xử lý'].includes(status)" nameBtn="Hủy đơn" styleBtn="btn-danger" @click="handleCancel" class="btn-func"></btn>
            <btn v-if="status == 'Yêu cầu hủy đơn'" nameBtn="Từ chối" styleBtn="btn-warning" @click="handleConfirm" class="btn-func"></btn>
        </td>
    </tr>
</template>

<script>
import Btn from "@/components/Common/Btn.vue"
import CountBtn from '../Common/CountBtn.vue';

export default {
    props: {
        order: {
            type: Object,
            required: true
        }
    },
    emits: ['showDetail', 'cancel', 'confirm', 'refuse'],
    components: {
        Btn,
        CountBtn,
    },
    data() {
        return {
            totalPrice: 0,
            status: 'Đang chờ xử lý'
        }
    },
    created() {
        this.totalPrice = this.getTotalPrice()
        this.status = this.getStatus()
    },
    methods: {
        shortForm(text, maxLength) {
            if (!maxLength)
                maxLength = 20
            if (text.length > maxLength) {
                return text.substring(0, maxLength) + '...';
            }
            return text;
        },
        getTotalPrice() {
            let total = 0
            this.order.orderItemsId.forEach(item => {
                total += item.price * item.quantity
            })
            return total
        },
        getStatus() {
            // get last status
            const length = this.order.orderStatuses.length
            return this.order.orderStatuses[length - 1].title
        },
        handleShowDetail() {
            this.$emit('showDetail', this.order)
        },
        handleCancel() {
            this.$emit('cancel', this.order)
        },
        handleConfirm() {
            this.$emit('confirm', {
                order: this.order,
                status: this.status,
            })
        },
    }
};
</script>

<style scoped>
.item {
    display: flex;
}

.item .item-name {
    margin-left: 10px;
    padding: 0;
    font-size: 14px;
}

.item .item-img {
    object-fit: cover;
    object-position: center;
    margin: 0;
    padding: 0;
}

.info-customer {
    text-align: left;
}

.btn-func {
    width: 60px;
    margin-top: 4px;
    display: block;
}
</style>