import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserUseCase } from '../../application/use-cases/auth/register-user.use-case.js';
import { LoginUserUseCase } from '../../application/use-cases/auth/login-user.use-case.js';
import { RegisterDto } from '../../application/dtos/register.dto.js';
import { LoginDto } from '../../application/dtos/login.dto.js';
import { AuthResponseDto } from '../../application/dtos/auth-response.dto.js';
import { User } from '../../domain/entities/user.js';
import { JwtPayload } from '../../infrastructure/auth/jwt-payload.js';

function toAuthResponse(user: User, accessToken: string): AuthResponseDto {
  return {
    accessToken,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      schoolLevel: user.schoolLevel,
      passionIds: user.passionIds,
    },
  };
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
    private readonly jwtService: JwtService,
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterDto): Promise<AuthResponseDto> {
    const user = await this.registerUserUseCase.execute(dto);
    const payload: JwtPayload = { sub: user.id, email: user.email };
    return toAuthResponse(user, await this.jwtService.signAsync(payload));
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.loginUserUseCase.execute(dto);
    const payload: JwtPayload = { sub: user.id, email: user.email };
    return toAuthResponse(user, await this.jwtService.signAsync(payload));
  }
}
