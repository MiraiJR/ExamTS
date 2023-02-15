import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Account } from "./auth.entity";
import { DataSource, Repository } from "typeorm";
import { JwtService } from "@nestjs/jwt";
import { HashService } from "src/utils/hash.util";
import { UsersService } from "src/users/users.service";
import { MailService } from "src/utils/mail.util";
import { RandomService } from "src/utils/random.util";
import { Cache } from "cache-manager";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Account)
        private accountsRepository: Repository<Account>,
        private dataSource: DataSource,
        private jwtService: JwtService,
        private hashService: HashService,
        private usersService: UsersService,
        private mailService: MailService,
        private randomService: RandomService,

        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) { }

    async login(AccountInterface): Promise<Object> {
        const curUser = await this.accountsRepository.findOne({
            where: {
                username: AccountInterface.username
            },
        });

        // check account existed, if existed => check password corrected
        const checkPassword: boolean = await this.hashService.comparePassword(AccountInterface.password, curUser.password);

        if (!curUser || !checkPassword) {
            return {
                success: false,
                msg: "Username or password don't correct!",
            };
        }

        // generate jwt
        const payload = { username: curUser.username, id: curUser.id };

        const refreshToken: string = await this.jwtService.sign(payload, {
            expiresIn: "7d",
            secret: process.env.JWT_SECRET_REFRESHTOKEN
        })

        // update refresh token to account
        this.updateRefreshToken(curUser.username, refreshToken);

        return {
            success: true,
            msg: "Login successfully!",
            access_token: this.jwtService.sign(payload, {
                expiresIn: "60s",
                secret: process.env.JWT_SECRET_KEY
            }), // jwt token,
            refreshToken: refreshToken,
        };
    }

    async register(AccountInterface): Promise<Object> {
        // check username is used
        const checkUser = await this.accountsRepository.findOne({
            where: {
                username: AccountInterface.username
            }
        });

        if (checkUser) {
            return {
                success: false,
                msg: "Username is existed!"
            };
        }

        // check email is used
        const checkExistedMail = await this.usersService.findUserByMail(AccountInterface.email);

        if (checkExistedMail) {
            return {
                success: false,
                msg: "Email is existed!"
            }
        }

        // hash password
        const passwordHashed = await this.hashService.hashPassword(AccountInterface.password);

        // all good => create new account
        await this.accountsRepository.save({
            username: AccountInterface.username,
            password: passwordHashed,
        });

        const curAccount = await this.findAccountByUsername(AccountInterface.username);

        // create new user
        await this.usersService.create({
            ...AccountInterface,
            id: curAccount.id,
        });

        return {
            success: true,
            msg: "Create new account successfully!"
        }
    }

    async findAccountByUsername(username: string): Promise<Account> {
        const result = await this.accountsRepository.findOne({
            where: {
                username
            }
        });

        return result;
    }

    updateRefreshToken(username: string, refreshToken: string) {
        return this.accountsRepository.update({
            username
        }, {
            refreshToken: refreshToken
        });
    }

    async forgetPassword(email: string): Promise<Boolean> {
        // check email belongs to any account
        const checkExistedAccount = await this.usersService.findUserByMail(email);

        if (!checkExistedAccount) {
            return false;
        }

        const OTPcode = this.randomService.randomOTPresetPwd(5);

        // store OTPcode to cacheStorage about 5 minutes
        await this.cacheManager.set(`${email}`, OTPcode, 5000 * 60)

        const content = `
            <h1>Hello ${checkExistedAccount.fullName},</h1>
            <div>OTP code to reset your password: </div>
                    <h1 style='font-size: 30px; margin-left: 10px; background-color: #53afff; color: black; text-align: center; padding: 10px;'> ${OTPcode} </h1>
            <div>OTP Code is valid for 5 minutes!</div>
            <div style='text-align: center;'>Thanks for using my website!</div>
        `

        const resMail = await this.mailService.sendMail(email, 'Reset password', content);

        return true;
    }

    async confirmOtpCode(email: string, OTPcode: string): Promise<Boolean> {
        const getOtp = await this.cacheManager.get(`${email}`);

        return OTPcode == getOtp ? true : false;
    }

    async resetPassword(email: string, password: string, confirmPassword: string): Promise<Boolean> {
        if (password != confirmPassword) {
            return false;
        }

        const user = await this.usersService.findUserByMail(email);

        // hash password
        const passwordHashed = await this.hashService.hashPassword(password);

        await this.accountsRepository.update({
            id: user.id
        }, {
            password: passwordHashed
        })

        // remove otp from storage
        await this.cacheManager.del(`${email}`);

        return true;
    }
}