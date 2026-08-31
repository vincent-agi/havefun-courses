import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard.js';
import { CurrentUser } from '../../infrastructure/auth/current-user.decorator.js';
import { type JwtPayload } from '../../infrastructure/auth/jwt-payload.js';
import { GetCurrentUserUseCase } from '../../application/use-cases/users/get-current-user.use-case.js';
import { UpdateOnboardingUseCase } from '../../application/use-cases/users/update-onboarding.use-case.js';
import { UpdateOnboardingDto } from '../../application/dtos/update-onboarding.dto.js';
import {
  UserProfileDto,
  toUserProfileDto,
} from '../../application/dtos/user-profile.dto.js';

@UseGuards(JwtAuthGuard)
@Controller('users/me')
export class UsersController {
  constructor(
    private readonly getCurrentUserUseCase: GetCurrentUserUseCase,
    private readonly updateOnboardingUseCase: UpdateOnboardingUseCase,
  ) {}

  @Get()
  async getProfile(
    @CurrentUser() currentUser: JwtPayload,
  ): Promise<UserProfileDto> {
    const user = await this.getCurrentUserUseCase.execute(currentUser.sub);
    return toUserProfileDto(user);
  }

  @Patch('onboarding')
  async updateOnboarding(
    @CurrentUser() currentUser: JwtPayload,
    @Body() dto: UpdateOnboardingDto,
  ): Promise<UserProfileDto> {
    const user = await this.updateOnboardingUseCase.execute(
      currentUser.sub,
      dto,
    );
    return toUserProfileDto(user);
  }
}
