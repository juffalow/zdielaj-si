type UploadedFile = import('react-dropzone').FileWithPath & {
  name: string;
  type: string;
  size: number;
  preview: string;
  isUploading: boolean;
  isDone: boolean;
  hasError: boolean;
  error?: {
    message: string;
    code: string;
  };
};
