import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../infrastructure/auth/jwt-auth.guard.js';
import { CurrentUser } from '../../infrastructure/auth/current-user.decorator.js';
import { type JwtPayload } from '../../infrastructure/auth/jwt-payload.js';
import { UploadMediaUseCase } from '../../application/use-cases/media/upload-media.use-case.js';
import { GetMediaUseCase } from '../../application/use-cases/media/get-media.use-case.js';
import { MediaResponseDto } from '../../application/dtos/media-response.dto.js';

const MAX_FILE_SIZE_BYTES = 8 * 1024 * 1024;

interface MulterFile {
  buffer: Buffer;
  mimetype: string;
  size: number;
}

@ApiTags('media')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('media')
export class MediaController {
  constructor(
    private readonly uploadMediaUseCase: UploadMediaUseCase,
    private readonly getMediaUseCase: GetMediaUseCase,
  ) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: MAX_FILE_SIZE_BYTES } }),
  )
  upload(
    @CurrentUser() currentUser: JwtPayload,
    @UploadedFile() file: MulterFile | undefined,
  ): Promise<MediaResponseDto> {
    return this.uploadMediaUseCase.execute(currentUser.sub, file);
  }

  @Get(':id')
  async download(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<StreamableFile> {
    const { stream, mimeType, sizeBytes } =
      await this.getMediaUseCase.execute(id);

    // Identifiant UUID non devinable : tout client authentifié peut afficher le
    // média (mobile, futur portail de relecture). Restreindre au propriétaire
    // ici si un besoin de confidentialité apparaît.
    res.set({ 'Cache-Control': 'private, max-age=31536000, immutable' });

    return new StreamableFile(stream, { type: mimeType, length: sizeBytes });
  }
}
