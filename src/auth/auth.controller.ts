import { Body, Controller, HttpException, HttpStatus, Post, Put, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUser } from "./dto/login.dto";
import { RegisterUser } from "./dto/register.dto";
import { ConfirmOTP } from "./dto/confirmOTP.dto";
import { ResetPwd } from "./dto/resetPwd.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body(new ValidationPipe()) user: LoginUser) {
        try {
            return this.authService.login(user);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'INTERNAL SERVER ERROR',
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }

    @Post('register')
    async register(@Body(new ValidationPipe()) user: RegisterUser) {
        try {
            return this.authService.register(user);
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'INTERNAL SERVER ERROR',
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }

    @Post('forget-password')
    async forgetPassword(@Body('email') email: string) {
        try {
            const checkSuccess = await this.authService.forgetPassword(email);

            if (!checkSuccess) {
                return {
                    success: false,
                    msg: "Email does not belong to any account!"
                }
            }

            return {
                success: true,
                msg: "OTP code is sent to your account!"
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'INTERNAL SERVER ERROR',
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }

    @Post('forget-password/confirm')
    async confirmPassword(@Body(new ValidationPipe()) confirmPwd: ConfirmOTP) {
        try {
            const isValid = await this.authService.confirmOtpCode(confirmPwd.email, confirmPwd.OTP);

            if (!isValid) {
                return {
                    success: false,
                    msg: 'OTP is not corrected or expired!'
                }
            }

            return {
                success: true,
                msg: 'OTP code is valid!'
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'INTERNAL SERVER ERROR',
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }

    @Put('forget-password/reset')
    async resetPassword(@Body(new ValidationPipe()) resetPwd: ResetPwd) {
        try {
            const isSuccess = await this.authService.resetPassword(resetPwd.email, resetPwd.password, resetPwd.confirmPassword);

            if (!isSuccess) {
                return {
                    success: false,
                    msg: 'Reset password failed!'
                }
            }

            return {
                success: true,
                msg: 'Reset password successfully!'
            }
        } catch (error) {
            throw new HttpException({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                error: 'INTERNAL SERVER ERROR',
            }, HttpStatus.FORBIDDEN, {
                cause: error
            });
        }
    }
}