import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard.js';
import { ListChallengesUseCase } from '../../application/use-cases/challenges/list-challenges.use-case.js';
import { ChallengeFiltersDto } from '../../application/dtos/challenge-filters.dto.js';
import { ChallengeSummaryDto } from '../../application/dtos/challenge-summary.dto.js';

@UseGuards(JwtAuthGuard)
@Controller('challenges')
export class ChallengesController {
  constructor(private readonly listChallengesUseCase: ListChallengesUseCase) {}

  @Get()
  list(@Query() filters: ChallengeFiltersDto): Promise<ChallengeSummaryDto[]> {
    return this.listChallengesUseCase.execute(filters);
  }
}
