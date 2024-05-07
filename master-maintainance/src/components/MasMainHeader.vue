<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <RouterLink v-bind:to="{name: 'home'}"><button class="btn header-design w-100">テーブル一覧</button></RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
.header-design {
    background-color:rgb(134, 71, 79);
    color: var(--color-text);
}
</style>