<script setup lang="ts">
import { useRoute } from "vue-router";
import axios from "axios";
import { ref } from "vue";
import { MasMainMessage } from "@/utils/Constants"; 
import { getQueryPage, getQueryLimit, makePageIndexes } from "@/utils/Pagenation";

const route = useRoute();

// route.pathは/records/xxxxなので、splitした3番目がテーブル名
const tableName = ref(route.path.split("/")[2]);

const datasInit = [];
const datas = ref(datasInit);

const recordCount = ref(0);
const currentPage = ref(getQueryPage(Number(route.query.page)));
const currentLimit = ref(getQueryLimit(Number(route.query.limit)));
const pageIndexesInit: string[] = [];
const pageIndexes = ref(pageIndexesInit);

// 件数を取得
const getCount = async(url: string): void => {
    const logUrl = `url=${url}`;
    console.log(logUrl);

    await axios.get(url)
    .then((res) => {
        const logCount = `count=${res.data.count}`;
        console.log(logCount);

        recordCount.value = res.data.count;
    })
    .catch((res) => {
        console.log(res.response.data.message);
        alert(MasMainMessage.ERROR_READ);
    });
}

// 一覧取得
const onReadList = async(url: string, urlGetCount: string, page: number, limit: number): void => {
    // 指定がなければクエリパラメータから取得
    if(page === undefined) {
        currentPage.value = getQueryPage(Number(route.query.page));
    } else {
        currentPage.value = page;
    }
    
    if(limit === undefined) {
        currentLimit.value = getQueryLimit(Number(route.query.limit));;
    } else {
        currentLimit.value = limit;
    }

    // limitが10,25,50以外ならエラー
    if(currentLimit.value != 10 && currentLimit.value != 25 && currentLimit.value != 50) {
        alert("パラメータが不正です。");
        return;
    }
    
    // 件数を取得
    await getCount(urlGetCount);

    const logUrl = `${url}?page=${currentPage.value}&limit=${currentLimit.value}`;
    console.log(logUrl);

    await axios.get(`${url}?page=${currentPage.value}&limit=${currentLimit.value}`)
    .then((res) => {
        const logLength = `length=${res.data.length}`;
        console.log(logLength);
        console.log(res.data);

        datas.value = res.data;

        // ページネーション作成
        pageIndexes.value = makePageIndexes(recordCount.value, currentLimit.value, currentPage.value);
    })
    .catch((res) => {
        console.log(res.response.data.message);
        alert(MasMainMessage.ERROR_READ);
    });
}

// 新規登録
const onCreate = async(url: string, params, urlReadList: string, urlGetCount: string): void => {
    if(!confirm(MasMainMessage.CONFIRM_CREATE)) {
        return;
    }
    const logUrl = `url=${url}`;
    console.log(logUrl);
    console.log(params);

    await axios.post(url, params)
    .then((res) => {
        // 再読み込み
        onReadList(urlReadList, urlGetCount, currentPage.value, currentLimit.value);
    })
    .catch((res) => {
        console.log(res.response.data.message);
        alert(MasMainMessage.ERROR_CREATE);
    });
}

// 更新
const onUpdate = async(url: string, params, urlReadList: string, urlGetCount: string): void => {
    if(!confirm(MasMainMessage.CONFIRM_UPDATE)) {
        return;
    }
    const logUrl = `url=${url}`;
    console.log(logUrl);
    console.log(params);

    await axios.put(url, params)
    .then((res) => {
        // 再読み込み
        onReadList(urlReadList, urlGetCount, currentPage.value, currentLimit.value);
    })
    .catch((res) => {
        console.log(res.response.data.message);
        alert(MasMainMessage.ERROR_UPDATE);
    });
}

// 削除
const onDelete = async(urlBase: string, deleteIds: number[], urlReadList: string, urlGetCount: string): void => {
    // 削除対象なし
    if(deleteIds.length <= 0) {
        alert("チェックなし");
        return;
    }

    if(!confirm(MasMainMessage.CONFIRM_DELETE)) {
        return;
    }

    // 1件ずつ削除
    for(const id of deleteIds) { 
        const url = `${urlBase}/${id}`;
        const logUrl = `url=${url}`;
        console.log(logUrl);

        await axios.delete(url)
        .then((res) => {
        })
        .catch((res) => {
            console.log(res.response.data.message);
            alert(MasMainMessage.ERROR_UPDATE);
        });
    }

    await onReadList(urlReadList, urlGetCount, currentPage.value, currentLimit.value);
}

</script>

<template>
    <div class="container">
        <div class="row mb-3">
            <div class="col">
                <h4>{{ tableName }}テーブル</h4>
            </div>
        </div>

        <RouterView
            v-bind:datas="datas"
            v-bind:recordCount="recordCount"
            v-bind:pageIndexes="pageIndexes"
            v-bind:tableName="tableName"
            v-bind:currentLimit="currentLimit"
            v-bind:currentPage="currentPage"
            v-on:create="onCreate"
            v-on:update="onUpdate"
            v-on:readList="onReadList"
            v-on:delete="onDelete"
        />
    </div>
</template>

<style scoped>
.h-design {
    background-color: rgb(78, 3, 13);
    border-radius: var(--border-radius);
    font-size: x-large;
}
</style>