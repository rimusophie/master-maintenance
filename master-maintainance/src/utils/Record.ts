export interface ComboBoxData {
    id: number;
    name: string;
}

export const buttonText = (id: number): string => {
    // idが存在しないなら追加
    if(!existsRecord(id)) {
        return "追加";
    }
    return "更新";
}
export const existsRecord = (id: number): boolean => {
    if(id == 0 || id === undefined || isNaN(id)) {
        return false;
    }
    return true;
}

export const getCheckDeleteIds = (datas: any[]): number[] => {
    // チェックしているidを取得
    let ret: number[] = [];

    for(const data of datas) {
        // undefinedの可能性があるため
        if(data.checkDelete == true) {
            ret.push(data.id);
        }
    }
    return ret;
}