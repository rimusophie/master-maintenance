<script setup lang="ts">
import { ref } from "vue";
import { existsRecord, buttonText } from "@/utils/Record";
import { BlogCategory } from "./BlogCategoriesUtil";

interface Props {
    id: number;
    name: string;
}

interface Emits {
    (event: "create", data: BlogCategory): void;
    (event: "update", data: BlogCategory): void;
    (event: "checkDelete", id: number, checked: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// 入力用
const inputCheckDelete = ref(false);
const inputName = ref(props.name);

const onClickProc = (): void => {
    // idが存在する場合は更新
    const data = {
        id: props.id,
        name: inputName.value
    };
    if(existsRecord(props.id)) {
        emit("update", data);
    } else {
        emit("create", data);
    }
}
// 削除チェック変更
const onCheckChange = (event: ChangeEvent): void => {
    emit("checkDelete", event.target.value, event.target.checked);
}
</script>

<template>
    <!-- trの構成 -->
    <input type="hidden" v-bind:value="id">
    <!-- 削除チェック -->
    <td class="text-center"><input type="checkbox" v-model="inputCheckDelete" v-on:change="onCheckChange" v-bind:value="id"></td>
    <!-- id -->
    <td class="pt-1 pb-1 pl-2 pr-2 text-right">{{ id }}</td>
    <!-- name -->
    <td><input type="text" class="w-100 pt-1 pb-1 pl-2 pr-2 text-design" v-model="inputName" maxlength="100"></td>
    <!-- ボタン -->
    <td class="text-center"><button class="pt-1 pb-1 pl-3 pr-3 btn-width btn-common-design btn-alert-design" v-on:click="onClickProc">{{ buttonText(id) }}</button></td>
</template>

<style scoped>
</style>