type UploadedFile = import('react-dropzone').FileWithPath & {
  name: string;
  type: string;
  size: number;
  preview: string;
  isUploading: boolean;
};
