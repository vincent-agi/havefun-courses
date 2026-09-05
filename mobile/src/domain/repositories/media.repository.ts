export interface UploadPhotoResult {
  /** URL relative renvoyée par l'API, ex : "/media/<id>". */
  mediaUrl: string;
}

export interface MediaRepository {
  uploadPhoto(fileUri: string): Promise<UploadPhotoResult>;
}
