import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { typeOrmConfigFactory } from './infrastructure/persistence/typeorm-config.factory.js';
import { AuthModule } from './presentation/modules/auth/auth.module.js';
import { UsersModule } from './presentation/modules/users/users.module.js';
import { PassionsModule } from './presentation/modules/passions/passions.module.js';
import { ChallengesModule } from './presentation/modules/challenges/challenges.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfigFactory,
    }),
    AuthModule,
    UsersModule,
    PassionsModule,
    ChallengesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
