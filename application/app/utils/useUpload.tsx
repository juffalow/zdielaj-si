import {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import type { ReactNode } from 'react';
import type { FileWithPath } from 'react-dropzone';
import logger from '../logger';

interface UploadContextType {
  files: UploadedFile[];
  uploadSpeed: number;
  clear: () => void,
  uploadFile: (file: FileWithPath, url: string, fields: Record<string, string>) => Promise<void>;
  uploadFiles: (files: FileWithPath[], uploadParams: { url: string, fields: Record<string, string> }[]) => Promise<void>;
}

const UploadContext = createContext<UploadContextType>(
  {} as UploadContextType
);

export function UploadProvider({ children }: { children: ReactNode }): React.ReactNode {
  const [ files, setFiles ] = useState<UploadedFile[]>([]);
  const [ uploadSpeed, setUploadSpeed ] = useState(0);

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
  }

  const uploadFiles = async (acceptedFiles: any, uploadParams: { url: string, fields: Record<string, string> }[]): Promise<void> => {
    setFiles(files.concat(acceptedFiles.map((file: any) => ({
      ...file,
      name: file.name,
      type: file.type,
      size: file.size,
      preview: URL.createObjectURL(file),
      isUploading: false,
      isDone: false,
    }))));

    const worker = async () => {
      while (acceptedFiles.length > 0) {
        const file = acceptedFiles.shift();
        const { url, fields } = uploadParams.shift() as { url: string, fields: Record<string, string> };

        logger.debug('Uploading file...', file);

        const start = performance.now();

        setFiles(fs => fs.map(f => f.path === file.path ? { ...f, isUploading: true } : f));

        await uploadFile(file as File, url as string, fields as Record<string, string>);

        setUploadSpeed((file.size / ((performance.now() - start) / 1000)) * 3);

        setFiles(fs => fs.map(f => f.path === file.path ? { ...f, isUploading: false, isDone: true } : f));
      }
    };

    await Promise.all(Array.from({ length: 2 }, () => worker()));
  }

  function clear() {
    setFiles([]);
  }

  const memoedValue = useMemo(
    () => ({
      files,
      uploadSpeed,
      clear,
      uploadFile,
      uploadFiles,
    }),
    [ files ]
  );

  return (
    <UploadContext.Provider value={memoedValue}>
      {children}
    </UploadContext.Provider>
  );
}

export default function useUpload() {
  return useContext(UploadContext);
}
