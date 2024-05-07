<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';

interface DbInfo {
    host: string;
    name: string;
    port: number;
}

const dbInfoInit: DbInfo = {
    "host": "", 
    "name": "", 
    "port": 0
};
const dbInfo = ref(dbInfoInit);

const tablesInit: string[] = [];
const tables = ref(tablesInit);

onMounted(() => {
    getDbInfo();
    getTableNames();
});

const getDbInfo = (): void => {
    axios.get('/api/dbinfo')
    .then((res) => {
        dbInfo.value = res.data;
    })
    .catch((res) => {
        console.log(res.response.data.message)
    });
}

const getTableNames = (): void => {
    axios.get('/api/tables')
    .then((res) => {
        tables.value = res.data;
    })
    .catch((res) => {
        console.log(res.response.data.message)
    });
}
</script>

<template>
<div class="container">
    <div class="row">
        <div class="col">
            ホスト : {{ dbInfo.host }}
        </div>
        <div class="col">
            データベース名 : {{ dbInfo.name }}
        </div>
        <div class="col">
            ポート : {{ dbInfo.port }}
        </div>
    </div>

    <div class="row">
        <div class="col">
            <li v-for="table in tables" :key="table.name">
                <RouterLink v-bind:to="{name: table.name}">{{ table.name }}</RouterLink>
            </li>
        </div>
    </div>
</div>
</template>

<style scoped>
</style>