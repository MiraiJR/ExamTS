import * as XLSX from "xlsx";

export class FileService {
    constructor() { }

    //  true: txt
    // false: xlsx
    checkTypeFile(filename: string): boolean {
        const extendFilename = filename.split(".")[filename.split(".").length - 1];

        return extendFilename === "txt" ? true : false;
    }

    readFileXlsx(path: string, sheetNumber: number): Array<Object> {
        let workbook = XLSX.readFile(path);
        let sheet_name_list = workbook.SheetNames;

        let result = XLSX.utils.sheet_to_json(
            workbook.Sheets[sheet_name_list[sheetNumber]]
        );

        return result;
    }

    getListMail(data: any): string[] {
        let result = [];

        data.forEach(ele => {
            result.push(ele.email);
        })

        return result;
    }

    getListStudent(data: any): string[] {
        let result = [];

        data.forEach(ele => {
            result.push(ele.fullname)
        });

        return result;
    }
} 