<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';

import BlogCategoriesInput from '@/components/BlogCategoriesInput.vue';

interface BlogCategory {
    id: number;
    name: string;
}

onMounted(() => {
    getDatas();
});
const blogCategoriesInit: BlogCategory[] = [];
const blogCategories = ref(blogCategoriesInit);
const deleteIdsInit: number[] = [];
const deleteIds = ref(deleteIdsInit);

const createName = ref('');

const getDatas = (): void => {
    axios.get('/api/blog_categories')
    .then((res) => {
        blogCategories.value = res.data;
    })
    .catch((res) => {
        console.log(res.response.data.message)
    });
}

// 追加
const onClickCreate =(): void => {
    const params = {
        name: createName.value
    };
    console.log(params);
    axios.post('/api/blog_categories', params)
    .then((res) => {
        createName.value = '';

        // 再読み込み
        getDatas();
    })
    .catch((res) => {
        console.log(res.response.data.message)
    });
}

// 更新
const onClickUpdate = (data): void => {
    const params = {
        name: data.name
    };
    console.log(params);
    axios.put(`/api/blog_categories/${data.id}`, params)
    .then((res) => {
        // 再読み込み
        getDatas();
    })
    .catch((res) => {
        console.log(res.response.data.message)
    });
}

// 削除
const onClickDelete = (): void => {
    for(const id of deleteIds.value) {
        axios.delete(`/api/blog_categories/${id}`)
        .then((res) => {
        })
        .catch((res) => {
            console.log(res.response.data.message)
        });
    }
     // 再読み込み
     getDatas();
}
</script>

<template>
<div class="container">
    <div class="row mb-3">
        <div class="col">
            blog_categoriesテーブル
        </div>
    </div>

    <div class="row">
        <div class="col">
            <button class="pt-1 pb-1 pl-3 pr-3 btn-width btn-design" @click="onClickDelete">削除</button>
        </div>
    </div>

    <div class="row">
        <div class="col-2"></div>
        <div class="col-8">
            <table class="mt-3 table-design w-100">
                <tr>
                    <th class="check-th-width"></th>
                    <th class="text-center">ID</th>
                    <th class="text-center">名称</th>
                    <th class="btn-th-width"></th>
                </tr>

                <!-- 新規追加用 -->
                <tr>
                    <td></td>
                    <td class="text-right"></td>
                    <td><input type="text" class="w-100 pt-1 pb-1 pl-2 pr-2 text-design" v-model="createName" maxlength="100"></td>
                    <td class="text-center"><button class="pt-1 pb-1 pl-3 pr-3 btn-width btn-design" @click="onClickCreate">追加</button></td>
                </tr>

                <!-- 既存データ -->
                <tr v-for="blog in blogCategories" :key="blog.id">
                    <input type="hidden" v-model="blog.id">
                    <td class="text-center"><input type="checkbox" v-model="deleteIds" v-bind:value="blog.id"></td>
                    <td class="pt-1 pb-1 pl-2 pr-2 text-right">{{ blog.id }}</td>
                    <td><input type="text" class="w-100 pt-1 pb-1 pl-2 pr-2 text-design" v-model="blog.name" maxlength="100"></td>
                    <td class="text-center"><button class="pt-1 pb-1 pl-3 pr-3 btn-width btn-design" @click="onClickUpdate(blog)">更新</button></td>
                </tr>
            </table>
        </div>
        <div class="col-2"></div>
    </div>
</div>
</template>

<style scoped>
.btn-width {
    width: 4rem;
}
.btn-th-width {
    width: 6rem;
}
.check-th-width {
    width: 2rem;
}
</style>