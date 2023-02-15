import { IsBoolean, IsEmail, IsNotEmpty, IsPhoneNumber, Length } from "class-validator";

export class RegisterUser {
    @IsNotEmpty()
    @Length(4)
    username: string;

    @Length(10, 20)
    password: string;

    @IsNotEmpty()
    firstName: string;

    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber("VN")
    phone: string;

    @IsNotEmpty()
    @Length(2)
    schoolName: string;

    @IsNotEmpty()
    @Length(2)
    address: string;

    @IsNotEmpty()
    gender: boolean;
}