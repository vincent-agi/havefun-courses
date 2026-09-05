import { createReadStream, type ReadStream } from 'node:fs';
import { mkdir, unlink, writeFile } from 'node:fs/promises';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { randomUUID } from 'node:crypto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const MEDIA_STORAGE = Symbol('MEDIA_STORAGE');

export interface StoredMedia {
  storagePath: string;
}

export interface MediaStorage {
  save(userId: string, buffer: Buffer, extension: string): Promise<StoredMedia>;
  createReadStream(storagePath: string): ReadStream;
  delete(storagePath: string): Promise<void>;
}

const DEFAULT_DIR = './storage/media';

/**
 * Stockage des médias sur le disque du serveur backend. Une seule racine à
 * sauvegarder (`MEDIA_STORAGE_DIR`). Pour passer plus tard à un stockage objet
 * (S3/MinIO), fournir une autre implémentation de `MediaStorage`.
 */
@Injectable()
export class LocalMediaStorage implements MediaStorage {
  private readonly root: string;

  constructor(config: ConfigService) {
    const configured = config.get<string>('MEDIA_STORAGE_DIR', DEFAULT_DIR);
    this.root = isAbsolute(configured)
      ? configured
      : resolve(process.cwd(), configured);
  }

  async save(
    userId: string,
    buffer: Buffer,
    extension: string,
  ): Promise<StoredMedia> {
    const storagePath = join(
      'submissions',
      userId,
      `${randomUUID()}.${extension}`,
    );
    const absolutePath = this.toAbsolute(storagePath);
    await mkdir(dirname(absolutePath), { recursive: true });
    await writeFile(absolutePath, buffer);
    return { storagePath };
  }

  createReadStream(storagePath: string): ReadStream {
    return createReadStream(this.toAbsolute(storagePath));
  }

  async delete(storagePath: string): Promise<void> {
    await unlink(this.toAbsolute(storagePath)).catch(() => undefined);
  }

  // Garde-fou anti-remontée de répertoire : `storagePath` vient de la base.
  private toAbsolute(storagePath: string): string {
    const absolutePath = resolve(this.root, storagePath);
    const rel = relative(this.root, absolutePath);
    if (rel.startsWith('..') || isAbsolute(rel)) {
      throw new Error('Chemin de média invalide.');
    }
    return absolutePath;
  }
}
