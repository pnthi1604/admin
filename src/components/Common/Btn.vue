<template>
    <button class="btn btn-primary" @click="handleClick"> {{ nameBtn }}</button>
</template>

<script>
export default {
    props: {
        nameBtn: {
            type: String,
            default: 'Submit'
        }
    },
    methods: {
        handleClick(event) {
            event.preventDefault();
            this.$emit('click');
        }
    }
}
</script>

<style scoped>
button {
    width: 100px;
}
</style>