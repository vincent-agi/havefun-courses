import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard.js';
import { CurrentUser } from '../../infrastructure/auth/current-user.decorator.js';
import { type JwtPayload } from '../../infrastructure/auth/jwt-payload.js';
import { ListChallengesUseCase } from '../../application/use-cases/challenges/list-challenges.use-case.js';
import { GetChallengeDetailUseCase } from '../../application/use-cases/challenges/get-challenge-detail.use-case.js';
import { CreateSubmissionUseCase } from '../../application/use-cases/challenges/create-submission.use-case.js';
import { ChallengeFiltersDto } from '../../application/dtos/challenge-filters.dto.js';
import { ChallengeSummaryDto } from '../../application/dtos/challenge-summary.dto.js';
import { ChallengeDetailDto } from '../../application/dtos/challenge-detail.dto.js';
import { CreateSubmissionDto } from '../../application/dtos/create-submission.dto.js';
import { SubmissionResponseDto } from '../../application/dtos/submission-response.dto.js';

@ApiTags('challenges')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('challenges')
export class ChallengesController {
  constructor(
    private readonly listChallengesUseCase: ListChallengesUseCase,
    private readonly getChallengeDetailUseCase: GetChallengeDetailUseCase,
    private readonly createSubmissionUseCase: CreateSubmissionUseCase,
  ) {}

  @Get()
  list(@Query() filters: ChallengeFiltersDto): Promise<ChallengeSummaryDto[]> {
    return this.listChallengesUseCase.execute(filters);
  }

  @Get(':id')
  getDetail(@Param('id') id: string): Promise<ChallengeDetailDto> {
    return this.getChallengeDetailUseCase.execute(id);
  }

  @Post(':id/submissions')
  submit(
    @CurrentUser() currentUser: JwtPayload,
    @Param('id') id: string,
    @Body() dto: CreateSubmissionDto,
  ): Promise<SubmissionResponseDto> {
    return this.createSubmissionUseCase.execute(currentUser.sub, id, dto);
  }
}
