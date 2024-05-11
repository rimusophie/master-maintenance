<script setup lang="ts">
interface Emits {
    (event: "retryRead"): void;
    (event: "delete"): void;
}

const emit = defineEmits<Emits>();

const onClickRetryRead = (): void => {
    emit("retryRead");
}
const onClickDelete = (): void => {
    emit("delete");
}
</script>

<template>
    <!-- class="container" は呼び出し元で定義されている前提 -->
    <div class="row">
        <div class="col">
            <button class="pt-1 pb-1 pl-3 pr-3 btn-read-width btn-common-design btn-normal-design" @click="onClickRetryRead">再読込</button>
            <button class="pt-1 pb-1 pl-3 pr-3 btn-width btn-common-design btn-alert-design" @click="onClickDelete">削除</button>
        </div>
    </div>
</template>

<style scoped>
</style>