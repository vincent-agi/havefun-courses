import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard.js';
import { CurrentUser } from '../../infrastructure/auth/current-user.decorator.js';
import { type JwtPayload } from '../../infrastructure/auth/jwt-payload.js';
import { GenerateUploadUrlUseCase } from '../../application/use-cases/media/generate-upload-url.use-case.js';
import {
  UploadUrlRequestDto,
  UploadUrlResponseDto,
} from '../../application/dtos/upload-url-request.dto.js';

@UseGuards(JwtAuthGuard)
@Controller('media')
export class MediaController {
  constructor(
    private readonly generateUploadUrlUseCase: GenerateUploadUrlUseCase,
  ) {}

  @Post('upload-url')
  generateUploadUrl(
    @CurrentUser() currentUser: JwtPayload,
    @Body() dto: UploadUrlRequestDto,
  ): Promise<UploadUrlResponseDto> {
    return this.generateUploadUrlUseCase.execute(
      currentUser.sub,
      dto.contentType,
    );
  }
}
