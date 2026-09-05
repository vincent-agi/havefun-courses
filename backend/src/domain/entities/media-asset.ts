export interface MediaAsset {
  id: string;
  ownerId: string;
  mimeType: string;
  sizeBytes: number;
  storagePath: string;
  createdAt: Date;
}

export interface NewMediaAsset {
  ownerId: string;
  mimeType: string;
  sizeBytes: number;
  storagePath: string;
}
