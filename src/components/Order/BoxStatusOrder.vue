<template>
    <div class="box-status-order">
        <div class="status-title">
            {{ statusTitle }}
        </div>
        <div class="create-date">
            {{ formatCreateDate }}
        </div>
    </div>
</template>

<script>

export default {
    props: {
        statusTitle: {
            type: String,
        },
        createDate: null,
    },
    created() {
        this.formatCreateDate = new Date(this.createDate);
        const date = this.formatCreateDate.getDate();
        const month = this.formatCreateDate.getMonth() + 1;
        const year = this.formatCreateDate.getFullYear();

        const hours = this.formatCreateDate.getHours();
        const minutes = this.formatCreateDate.getMinutes();
        const seconds = this.formatCreateDate.getSeconds();
        this.formatCreateDate = `${date}/${month}/${year} lúc ${hours}h:${minutes}m:${seconds}s`;
    },
    data() {
        return {
            formatCreateDate: ""
        }

    }
}
</script>

<style scoped>
.box-status-order {
    border: 1px solid #e0e0e0;
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
}

.status-title {
    font-weight: bold;
}

.create-date {
    font-size: 12px;
    color: #9e9e9e;
}
</style>