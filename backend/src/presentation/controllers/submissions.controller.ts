import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard.js';
import { CurrentUser } from '../../infrastructure/auth/current-user.decorator.js';
import { type JwtPayload } from '../../infrastructure/auth/jwt-payload.js';
import { ListMySubmissionsUseCase } from '../../application/use-cases/challenges/list-my-submissions.use-case.js';
import { SubmissionResponseDto } from '../../application/dtos/submission-response.dto.js';

@UseGuards(JwtAuthGuard)
@Controller('submissions')
export class SubmissionsController {
  constructor(
    private readonly listMySubmissionsUseCase: ListMySubmissionsUseCase,
  ) {}

  @Get('me')
  listMine(
    @CurrentUser() currentUser: JwtPayload,
  ): Promise<SubmissionResponseDto[]> {
    return this.listMySubmissionsUseCase.execute(currentUser.sub);
  }
}
