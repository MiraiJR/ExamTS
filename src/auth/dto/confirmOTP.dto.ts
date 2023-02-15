import { IsEmail, IsNotEmpty } from "class-validator";

export class ConfirmOTP {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    OTP: string;
}