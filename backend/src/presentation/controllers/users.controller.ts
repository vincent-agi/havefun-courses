import {
  Body,
  Controller,
  Get,
  Header,
  Patch,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard.js';
import { CurrentUser } from '../../infrastructure/auth/current-user.decorator.js';
import { type JwtPayload } from '../../infrastructure/auth/jwt-payload.js';
import { GetCurrentUserUseCase } from '../../application/use-cases/users/get-current-user.use-case.js';
import { UpdateOnboardingUseCase } from '../../application/use-cases/users/update-onboarding.use-case.js';
import { ListUserBadgesUseCase } from '../../application/use-cases/users/list-user-badges.use-case.js';
import { GetPassCompetencesUseCase } from '../../application/use-cases/users/get-pass-competences.use-case.js';
import { GeneratePassCompetencesPdfUseCase } from '../../application/use-cases/users/generate-pass-competences-pdf.use-case.js';
import { UpdateOnboardingDto } from '../../application/dtos/update-onboarding.dto.js';
import {
  UserProfileDto,
  toUserProfileDto,
} from '../../application/dtos/user-profile.dto.js';
import { BadgeStatusDto } from '../../application/dtos/badge-status.dto.js';
import { PassCompetencesDto } from '../../application/dtos/pass-competences.dto.js';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users/me')
export class UsersController {
  constructor(
    private readonly getCurrentUserUseCase: GetCurrentUserUseCase,
    private readonly updateOnboardingUseCase: UpdateOnboardingUseCase,
    private readonly listUserBadgesUseCase: ListUserBadgesUseCase,
    private readonly getPassCompetencesUseCase: GetPassCompetencesUseCase,
    private readonly generatePassCompetencesPdfUseCase: GeneratePassCompetencesPdfUseCase,
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

  @Get('badges')
  listBadges(
    @CurrentUser() currentUser: JwtPayload,
  ): Promise<BadgeStatusDto[]> {
    return this.listUserBadgesUseCase.execute(currentUser.sub);
  }

  @Get('pass-competences')
  getPassCompetences(
    @CurrentUser() currentUser: JwtPayload,
  ): Promise<PassCompetencesDto> {
    return this.getPassCompetencesUseCase.execute(currentUser.sub);
  }

  @Get('pass-competences/pdf')
  @Header('Content-Type', 'application/pdf')
  @Header('Content-Disposition', 'attachment; filename="pass-competences.pdf"')
  async getPassCompetencesPdf(
    @CurrentUser() currentUser: JwtPayload,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Buffer> {
    const pdf = await this.generatePassCompetencesPdfUseCase.execute(
      currentUser.sub,
    );
    res.setHeader('Content-Length', pdf.length);
    return pdf;
  }
}
