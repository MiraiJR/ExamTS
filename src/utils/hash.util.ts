import * as bcrypt from "bcrypt";

const saltOrRounds = 10;

export class HashService {
    async hashPassword(password: string): Promise<string> {
        const result: string = await bcrypt.hash(password, saltOrRounds);

        return result;
    }

    async comparePassword(password: string, passwordHashed: string): Promise<boolean> {
        const result: boolean = await bcrypt.compare(password, passwordHashed);

        return result;
    }
}