import { MediaAsset, NewMediaAsset } from '../entities/media-asset.js';

export const MEDIA_ASSET_REPOSITORY = Symbol('MEDIA_ASSET_REPOSITORY');

export interface MediaAssetRepository {
  create(asset: NewMediaAsset): Promise<MediaAsset>;
  findById(id: string): Promise<MediaAsset | null>;
}
