import { RcFile } from "antd/es/upload";
import { notifyErr } from "./notify";

export const checkTypeFile = (file: RcFile, type: string): boolean => {
    console.log(file);
    
    const typeDefinitions =
        [
            {
                key: "text/plain",
                value: "txt"
            },
            {
                key: "application/zip",
                value: "zip"
            },
            {
                key: "application/x-zip-compressed",
                value: "zip"
            },
        ];

    let value = "This file type is not defined at checkTypeFile";
    typeDefinitions.forEach(element => {
        if (type == element.key) {
            value = element.value;
        }
    });
    if (file.type != type) {
        return false;
    }
    return true;
}
export const checkSizeFile = (file: RcFile, maxSize: number): boolean => {
    if (file.size <= maxSize && file.size <= maxSize) {
        return true;
    }
    else if (file.size > maxSize) {
        notifyErr("Source code max size 250 MB");
    } else if (file.size > maxSize) {
        notifyErr("Text file max size 250 MB");
    }
    return false;
}