export const URL = "/api/blog_categories";
export const URL_READ_LIST = "/api/blog_categories";
export const URL_GET_COUNT = "/api/blog_categories_count";
export const URL_GET_KEYVALUE = "/api/blog_categories_keyvalue";

export interface BlogCategory {
    id: number;
    name: string;
    checkDelete: boolean;    // 削除チェックがオンがどうか
}