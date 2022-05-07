export enum MediaFileType {
  image = 'IMAGE',
  video = 'VIDEO',
  pdf = 'PDF',
}

export interface MediaSaveResponse {
  status: string;
  data: MediaMetaData;
}

export interface MediaMetaData {
  id: string;
  fileUrl: string;
  fileName: string;
  mediaFileType: MediaFileType;
  contentType: string;
  contentLength: string;
  fileKey: string;
}
