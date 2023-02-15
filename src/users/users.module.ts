import { Module } from '@nestjs/common';
import { UserController } from './users.controller';
import { UsersService } from './users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import configuration from 'src/config/configuration';
import { RandomService } from 'src/utils/random.util';

@Module({
  imports: [ConfigModule.forRoot({
    load: [configuration]
  }), TypeOrmModule.forFeature([User]), JwtModule.register({
    secret: process.env.JWT_SECRET_KEY,
    signOptions: {
      expiresIn: process.env.JWT_EXPIRED_TIME,
    },
  })],
  controllers: [UserController],
  providers: [UsersService, RandomService],
  exports: [UsersService],
})
export class UsersModule {
  constructor(private configService: ConfigService) { }
}
