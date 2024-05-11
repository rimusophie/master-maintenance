<script setup lang="ts">
import { ref, computed } from "vue";
import { ComboBoxData } from "@/utils/Record";

interface Props {
    id: number;
    title: string;
    blog_category_id: number;
    filename: string;
    updated_date: string;
    blog_categories: ComboBoxData[];
}

interface Emits {
    (event: "create", data: Blog): void;
    (event: "update", data: Blog): void;
    (event: "checkDelete", id: number, checked: boolean): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

// 入力用
const inputCheckDelete = ref(false);
const inputTitle = ref(props.title);
const inputBlogCategoryId = ref(props.blog_category_id);
const inputFilename = ref(props.filename);
const inputUpdatedDate = ref(props.updated_date);

const onClickProc = (): void => {
    // idが存在する場合は更新
    const data = {
        id: props.id,
        title: inputTitle.value,
        blog_category_id: inputBlogCategoryId.value,
        filename: inputFilename.value,
        updated_date: inputUpdatedDate.value,
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
const buttonText = computed((): string => {
    // idが存在しないなら追加
    if(!existsRecord(props.id)) {
        return "追加";
    }
    return "更新";
});
const existsRecord = (id: number): boolean => {
    if(id == 0 || id === undefined || isNaN(id)) {
        return false;
    }
    return true;
}
</script>

<template>
    <!-- trの構成 -->
    <input type="hidden" v-bind:value="id">
    <!-- 削除チェック -->
    <td class="text-center"><input type="checkbox" v-model="inputCheckDelete" v-on:change="onCheckChange" v-bind:value="id"></td>
    <!-- id -->
    <td class="pt-1 pb-1 pl-2 pr-2 text-right">{{ id }}</td>
    <!-- title -->
    <td><input type="text" class="w-100 pt-1 pb-1 pl-2 pr-2 text-design" v-model="inputTitle" maxlength="100"></td>
    <!-- blog_category_id -->
    <td>
        <select v-model="inputBlogCategoryId" class="pt-1 pb-1 pl-2 pr-2 combobox-design">
            <option v-for="blogCategory in blog_categories" :key="blogCategory.id" v-bind:value="blogCategory.id">{{ blogCategory.name }}</option>
        </select>
    </td>
    <!-- filename -->
    <td><input type="text" class="w-100 pt-1 pb-1 pl-2 pr-2 text-design" v-model="inputFilename" maxlength="100"></td>
    <!-- update_date -->
    <td><input type="date" class="w-100 pt-1 pb-1 pl-2 pr-2 text-design" v-model="inputUpdatedDate" maxlength="100"></td>
    <!-- ボタン -->
    <td class="text-center"><button class="pt-1 pb-1 pl-3 pr-3 btn-width btn-common-design btn-alert-design" v-on:click="onClickProc">{{ buttonText }}</button></td>             
</template>

<style scoped>
</style>