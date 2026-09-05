import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PersistenceModule } from '../../../infrastructure/persistence/persistence.module.js';
import { JwtStrategy } from '../../../infrastructure/auth/jwt.strategy.js';
import { RegisterUserUseCase } from '../../../application/use-cases/auth/register-user.use-case.js';
import { LoginUserUseCase } from '../../../application/use-cases/auth/login-user.use-case.js';
import { AuthController } from '../../controllers/auth.controller.js';

@Module({
  imports: [
    PersistenceModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET', 'changeme'),
        signOptions: {
          expiresIn: Number(
            config.get<string>('JWT_EXPIRES_IN_SECONDS', '86400'),
          ),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [RegisterUserUseCase, LoginUserUseCase, JwtStrategy],
})
export class AuthModule {}
