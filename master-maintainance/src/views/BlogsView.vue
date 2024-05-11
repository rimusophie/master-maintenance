<script setup lang="ts">
import axios from "axios";
import { onMounted, ref } from "vue";
import { MasMainMessage } from "@/utils/Constants"; 
import CommonOperation from "@/components/CommonOperation.vue";
import TitleHeader from "@/components/TitleHeader.vue";
import Pagenation from "@/components/Pagenation.vue";
import BlogsHeader from "@/components/records/Blogs/BlogsHeader.vue";
import BlogsRecord from "@/components/records/Blogs/BlogsRecord.vue";
import { Blog,URL, URL_READ_LIST, URL_GET_COUNT } from "@/components/records/Blogs/BlogsUtil";
import { URL_GET_KEYVALUE as URL_GET_KEYVALUE_BLOG_CATEGORIES } from "@/components/records/BlogCategories/BlogCategoriesUtil";
import { ComboBoxData } from '@/utils/Record';
import { getCheckDeleteIds } from "@/utils/Record";

interface Props {
    datas: Blog[];
    recordCount: number;
    pageIndexes: string[];
    tableName: string;
    currentPage: number;
    currentLimit: number;
}

interface Emits {
    (event: "readList", url: string, urlGetCount: string, page: number, limit: number): void;
    (event: "create", url: string, params, urlReadList: string, urlGetCount: string): void;
    (event: "update", url: string, params, urlReadList: string, urlGetCount: string): void;
    (event: "delete", urlBase: string, deleteIds: number[], urlReadList: string, urlGetCount: string): void;
    (event: "getSubDatas", url: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const blogCategoriesInit: ComboBoxData[] = [];
const blogCategories = ref(blogCategoriesInit);

const dummyId = ref(0);

onMounted(() => {
    getBlogCategories();
    onReadList(props.currentPage, props.currentLimit);
});

// 新規登録
const onCreate = (data: Blog): void => {
    const params = {
        title: data.title,
        blog_category_id: data.blog_category_id,
        filename: data.filename,
        updated_date: data.updated_date,
    };
    emit("create", URL, params, URL_READ_LIST, URL_GET_COUNT);
}

// 一覧取得
const onReadList = (page: number, limit: number): void => {
    emit("readList", URL, URL_GET_COUNT, page, limit);
}

// 更新
const onUpdate = (data): void => {
    const url = `${URL}/${data.id}`;
    const params = {
        title: data.title,
        blog_category_id: data.blog_category_id,
        filename: data.filename,
        updated_date: data.updated_date,
    };
    emit("update", url, params, URL_READ_LIST, URL_GET_COUNT);
}

// 削除
const onDelete = (): void => {
    const deleteIds: number[] = getCheckDeleteIds(props.datas);

    emit("delete", URL, deleteIds, URL_READ_LIST, URL_GET_COUNT);
}

// 削除チェック反映
const onCheckDelete = (id: number, checked: boolean): void => {
    // idで検索する
    const data = props.datas.find(element => element.id == id);
    data.checkDelete = checked;
}

// ページ切替
const onReload = (page: number, limit: number): void => {
    onReadList(page, limit);
}

// 共通ボタン再読込
const onRetryRead = (): void => {
    onReadList(props.currentPage, props.currentLimit);
}

// blog_categories取得
const getBlogCategories = async(): void => {
    await axios.get(URL_GET_KEYVALUE_BLOG_CATEGORIES)
    .then((res) => {
        const logLength = `length=${res.data.length}`;
        console.log(logLength);

        blogCategories.value = res.data;
    })
    .catch((res) => {
        console.log(res.response.data.message);
        alert(MasMainMessage.ERROR_READ);
    });
}
</script>

<template>
    <!-- 追加 -->
    <TitleHeader title="追加"/>

    <div class="row mb-5">
        <div class="col">
            <table class="table-design w-100"> 
                <tr>
                    <BlogsHeader/>
                </tr>
                <tr>
                    <BlogsRecord
                        v-bind:id="dummyId"
                        title=""
                        v-bind:blog_category_id="dummyId"
                        filename=""
                        updated_date=""
                        v-bind:blog_categories="blogCategories"
                        v-on:create="onCreate"
                    />
                </tr>
            </table>
        </div>
    </div>

    <!-- 更新 -->
    <TitleHeader title="一覧"/>

    <!-- 共通ボタン -->
    <CommonOperation v-on:retryRead="onRetryRead" v-on:delete="onDelete" class="mb-3"/>

    <!-- ページ -->
    <Pagenation 
        v-bind:recordCount="recordCount" 
        v-bind:pageIndexes="pageIndexes" 
        v-bind:tableName="tableName"
        v-bind:limit="currentLimit" 
        v-bind:page="currentPage"
        v-on:reload="onReload" 
        class="mb-1"/>
        
    <div class="row">
        <div class="col">
            <table class="table-design w-100"> 
                <tr>
                    <BlogsHeader/>
                </tr>
                <tr v-for="record in datas" :key="record.id">
                    <BlogsRecord
                        v-bind:id="record.id"
                        v-bind:title="record.title"
                        v-bind:blog_category_id="record.blog_category_id"
                        v-bind:filename="record.filename"
                        v-bind:updated_date="record.updated_date"
                        v-bind:blog_categories="blogCategories"
                        v-on:update="onUpdate"
                        v-on:checkDelete="onCheckDelete"
                    />
                </tr>
            </table>
        </div>
    </div>
</template>

<style scoped>
</style>