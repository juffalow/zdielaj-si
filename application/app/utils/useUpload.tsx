import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { FileWithPath } from 'react-dropzone';
import pRetry from 'p-retry';
import logger from '../logger';

interface UploadContextType {
  files: UploadedFile[];
  uploadSpeed: number;
  clear: () => void;
  stashFiles: (files: FileWithPath[]) => void;
  uploadFiles: (
    files: FileWithPath[],
    uploadParams: { url: string; fields: Record<string, string> }[]
  ) => Promise<void>;
  rejectedFiles: (fileRejections: any) => void;
}

const UploadContext = createContext<UploadContextType>({} as UploadContextType);

export function UploadProvider({ children }: { children: ReactNode }): React.ReactNode {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [uploadSpeed, setUploadSpeed] = useState(0);

  const stashFiles = (acceptedFiles: FileWithPath[]) => {
    setFiles((files) =>
      files.concat(
        acceptedFiles.map((file) => ({
          ...file,
          name: file.name,
          type: file.type,
          size: file.size,
          preview: URL.createObjectURL(file),
          isUploading: false,
          isDone: false,
          hasError: false,
        }))
      )
    );
  };

  const uploadFile = async (file: any, url: string, fields: Record<string, string>): Promise<void> => {
    const formData = new FormData();

    Object.entries(fields).forEach(([k, v]) => {
      formData.append(k, v);
    });

    formData.append('file', file);

    await fetch(url, {
      method: 'POST',
      body: formData,
    });
  };

  const uploadFiles = async (
    acceptedFiles: FileWithPath[],
    uploadParams: { url: string; fields: Record<string, string> }[]
  ): Promise<void> => {
    const worker = async () => {
      const file = acceptedFiles.shift();

      if (typeof file === 'undefined') {
        return false;
      }

      const { url, fields } = uploadParams.shift() as { url: string; fields: Record<string, string> };

      logger.debug('Uploading file...', file);

      setFiles((fs) => fs.map((f) => (f.path === file.path ? { ...f, isUploading: true } : f)));

      const start = performance.now();

      await pRetry(() => uploadFile(file as File, url as string, fields as Record<string, string>), { retries: 5 });

      setUploadSpeed((file.size / ((performance.now() - start) / 1000)) * 3);
      setFiles((fs) => fs.map((f) => (f.path === file.path ? { ...f, isUploading: false, isDone: true } : f)));

      return true;
    };

    async function runWorker() {
      const result = await worker();

      if (result) {
        runWorker();
      }
    }

    await Promise.all(Array.from({ length: 2 }, runWorker));
  };

  const rejectedFiles = (fileRejections: any) => {
    setFiles((files) =>
      files.concat(
        fileRejections.map((fileRejection: any) => ({
          ...fileRejection.file,
          name: fileRejection.file.name,
          type: fileRejection.file.type,
          size: fileRejection.file.size,
          preview: URL.createObjectURL(fileRejection.file),
          isUploading: false,
          isDone: true,
          hasError: true,
          error: {
            message: fileRejection.errors[0].message,
            code: fileRejection.errors[0].code,
          },
        }))
      )
    );
  };

  function clear() {
    setFiles([]);
  }

  const memoedValue = useMemo(
    () => ({
      files,
      uploadSpeed,
      clear,
      stashFiles,
      uploadFiles,
      rejectedFiles,
    }),
    [files]
  );

  return <UploadContext.Provider value={memoedValue}>{children}</UploadContext.Provider>;
}

export default function useUpload() {
  return useContext(UploadContext);
}
