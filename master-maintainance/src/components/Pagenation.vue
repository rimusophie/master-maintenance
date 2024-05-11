<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { getPageIndex } from "@/utils/Pagenation";

interface Emits {
    (event: "reload", page: number, limit: number): void;
}
const emit = defineEmits<Emits>();

const limitsInit: number[] = [10, 25, 50];
const limits = ref(limitsInit);

const onClickReload = (page: number, limit: number): void => {
    emit("reload", page, limit);
}

interface Props {
    recordCount: number;    // 全件数
    pageIndexes: string[];  // ページネーションのリンク
    tableName: string;  // テーブル名
    limit: number;      // 1ページ当たりの表示件数
    page: number;    // 現在のページ
}

const props = defineProps<Props>();
</script>

<template>
    <!-- class="container" は呼び出し元で定義されている前提 -->
    <div class="row">
        <div class="col">
            全{{ recordCount }}件
        </div>

        <div class="col">
            {{ page }}ページ目 1ページ{{ limit }}件表示
        </div>

        <!-- 1ページ当たりの件数 -->
        <div class="col">
            1ページあたりの件数 : 
            <RouterLink v-for="tmp in limits" :key="tmp" v-bind:to="{name: tableName, query: {page: page, limit: tmp}}" v-on:click="onClickReload(page, tmp)">{{ tmp }}</RouterLink>
        </div>

        <div class="col text-right">
            ページ : 
            <RouterLink v-for="tmp in pageIndexes" :key="tmp" v-bind:to="{name: tableName, query: {page: getPageIndex(tmp, page, recordCount, limit), limit:limit}}" v-on:click="onClickReload(getPageIndex(tmp, page, recordCount, limit), limit)">{{ tmp }}</RouterLink>
        </div>
    </div>
</template>

<style scoped>
</style>