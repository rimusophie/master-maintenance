export const URL = "/api/blogs";
export const URL_READ_LIST = "/api/blogs";
export const URL_GET_COUNT = "/api/blogs_count";

export interface Blog {
    id: number;
    title: string;
    blog_category_id: number;
    filename: string;
    updated_date: Date;
    checkDelete: boolean;    // 削除チェックがオンがどうか
}