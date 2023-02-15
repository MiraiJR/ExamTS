import { IsArray, IsDateString, IsEnum, IsNotEmpty, IsNumber } from "class-validator";

export class CreateExamDTO {
    @IsNotEmpty()
    subject: string;

    @IsNumber()
    grade: number;

    @IsNotEmpty()
    form: string;

    @IsNotEmpty()
    schoolName: string;

    @IsDateString()
    startedAt: Date;

    @IsDateString()
    finishedAt: Date;

    @IsArray()
    listEmail: Array<string>;
}