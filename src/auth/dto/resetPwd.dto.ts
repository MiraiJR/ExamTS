import { IsEmail, Length } from "class-validator";

export class ResetPwd {
    @IsEmail()
    email: string;

    @Length(10)
    password: string;

    @Length(10)
    confirmPassword: string;
}