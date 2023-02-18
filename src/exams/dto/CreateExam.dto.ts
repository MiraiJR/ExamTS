import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsNumberString } from "class-validator";

export class CreateExamDTO {
    @IsNotEmpty()
    subject: string;

    @IsNumberString()
    grade: number;

    @IsNotEmpty()
    form: string;

    @IsNotEmpty()
    schoolName: string;

    @IsNotEmpty()
    startedAt: Date;

    @IsNotEmpty()
    finishedAt: Date;

    // @IsArray()
    // listEmail: Array<string>;
}