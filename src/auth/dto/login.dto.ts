import { IsNotEmpty, Length } from "class-validator";

export class LoginUser {
    @IsNotEmpty()
    username: string;

    @Length(10, 20)
    password: string;
}