import { CacheModule, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "./auth.entity";
import { JwtModule } from "@nestjs/jwt/dist";
import { ConfigModule, ConfigService } from "@nestjs/config";
import configuration from "src/config/configuration";
import { HashService } from "src/utils/hash.util";
import { UsersService } from "src/users/users.service";
import { UsersModule } from "src/users/users.module";
import { User } from "src/users/user.entity";
import { RandomService } from "src/utils/random.util";
import { MailService } from "src/utils/mail.util";

@Module({
    imports: [TypeOrmModule.forFeature([Account, User]), ConfigModule.forRoot({
        load: [configuration]
    }), JwtModule.register({
        secret: "",
    }), CacheModule.register(), UsersModule],
    controllers: [AuthController],
    providers: [AuthService, HashService, RandomService, MailService],
    exports: [AuthService]
})
export class AuthModule {

}