import { createReadStream, readFile, readFileSync } from "fs";
import { join } from "path";

export class RandomService {
    constructor(
    ) {
    }

    // random OTP code for reset password
    randomOTPresetPwd(length: number): string {
        let result: string = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;

        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }

        return result;
    }

    randomCodeExam(subject: string): string {
        let result: string = this.getCodeSubject(subject);
        result += this.randomOTPresetPwd(4);

        return result;
    }

    getCodeSubject(subject: string): string {
        let rawArraySubject = readFileSync(join(process.cwd(), "src/data/CodeSubject.json"));
        const arraySubject = JSON.parse(rawArraySubject.toString());

        let result = "";

        arraySubject.forEach(element => {
            if (element.subject === subject) {
                result = element.code;
            }
        });

        return result;
    }
}