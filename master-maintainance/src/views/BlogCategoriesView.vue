<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';

interface BlogCategory {
    id: int;
    name: string;
}

onMounted(() => {
    getDatas();
});
const blogCategoriesInit: BlogCategory[] = [];
const blogCategories = ref(blogCategoriesInit);
const getDatas = (): void => {
    axios.get('/api/blog_categories')
    .then((res) => {
        blogCategories.value = res.data;
    })
    .catch((res) => {
        console.log(res.response.data.message)
    });
}
</script>

<template>
<div>
    <table class="table table-dark table-sm table-design mt-3">
        <thead>
            <th>ID</th>
            <th>名称</th>
        </thead>

        <tbody>
            <tr v-for="blog in blogCategories" :key="blog.id">
                <td>{{ blog.id }}</td>
                <td>{{ blog.name }}</td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<style scoped>
</style>