<script setup lang="ts">
interface Props {
    title: string;
}
const props = defineProps<Props>();
</script>

<template>
    <div class="row mb-3">
        <div class="col text-center">
            <div class="h-design">{{ title }}</div>
        </div>
    </div>
</template>

<style scoped>
</style>