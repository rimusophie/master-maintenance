const PAGENATION_FIRST: string = "最初へ";
const PAGENATION_PRE: string = "前へ";
const PAGENATION_NEXT: string = "次へ";
const PAGENATION_LAST: string = "最後へ";

export const getQueryPage = (page): number => {
    if(page === undefined || isNaN(page)) {
        return 1;
    }
    return page;
}
export const getQueryLimit = (limit): number => {
    if(limit === undefined || isNaN(limit)) {
        return 10;
    }
    return limit;
}
// ページインデックスを生成
export const makePageIndexes = (recordCount: number, limit: number, page: number): string[] => {
    const ret: string[] = [];

    // 件数が0ならば空
    if(recordCount <= 0) {
        return ret;
    }
    // 全ページ数を取得
    const pageCount = Math.ceil(recordCount / limit);

    // 「最初へ」、「前へ」はカレントが2ページ以降のみ表示
    if(page >= 2) {
        ret.push(PAGENATION_FIRST);
        ret.push(PAGENATION_PRE);
    }
    // カレントの前後2ページを表示
    const nearPages: number[] = [page - 2, page - 1, page, page + 1, page + 2];

    for(const tmp of nearPages) {
        if((0 < tmp && tmp <= pageCount)) {
            ret.push(String(tmp));
        }
    }

    // 「次へ」、「最後へ」はカレントが最終ページより小さいときのみ表示
    if(page < pageCount) {
        ret.push(PAGENATION_NEXT);
        ret.push(PAGENATION_LAST);
    }

    return ret;
}

// ページインデックスを取得
export const getPageIndex = (pageIndexName: string, current: number, recordCount: number, limit: number): number => {
    if(pageIndexName == PAGENATION_FIRST) {
        return 1;
    } else if(pageIndexName == PAGENATION_PRE) {
        return current - 1;
    } else if(pageIndexName == PAGENATION_NEXT) {
        return current + 1;
    } else if(pageIndexName == PAGENATION_LAST) {
        return Math.ceil(recordCount / limit);
    }
    return Number(pageIndexName);
}