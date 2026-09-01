export interface UploadUrlResult {
  uploadUrl: string;
  mediaUrl: string;
}

export interface MediaRepository {
  requestUploadUrl(contentType: string): Promise<UploadUrlResult>;
  uploadFile(
    uploadUrl: string,
    fileUri: string,
    contentType: string,
  ): Promise<void>;
}
