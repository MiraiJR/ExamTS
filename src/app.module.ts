import { CacheModule, MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { UsersMiddleware } from './users/user.middleware';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [UsersModule, AuthModule, ConfigModule.forRoot({
    isGlobal: true,
    cache: true,
  }), TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '1234',
    database: 'LEARNING',
    synchronize: true,
    autoLoadEntities: true,
  }), CacheModule.register({
    isGlobal: true
  })],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UsersMiddleware)
      .forRoutes({
        path: 'users',
        method: RequestMethod.POST
      });
  }
}
