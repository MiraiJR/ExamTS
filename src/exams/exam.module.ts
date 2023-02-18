import { Module } from "@nestjs/common";
import { ExamController } from "./exam.controller";
import { ExamService } from "./exam.service";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "src/users/users.module";
import { User } from "src/users/user.entity";
import { Account } from "src/auth/auth.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Exam } from "./exam.entity";
import { RandomService } from "src/utils/random.util";
import { FileService } from "src/utils/file.util";


@Module({
    imports: [UsersModule, TypeOrmModule.forFeature([User, Account, Exam]), JwtModule],
    controllers: [ExamController],
    providers: [ExamService, RandomService, FileService],
    exports: [ExamService],
})
export class ExamModule {
    
}