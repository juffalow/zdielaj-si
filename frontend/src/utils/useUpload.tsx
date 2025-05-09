import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';
import type { FileWithPath } from 'react-dropzone';
import { uploadPhoto } from '../api/services';
import logger from '../logger';

interface UploadContextType {
  files: UploadedFile[];
  uploadSpeed: number;
  clear: () => void,
  onDrop: (acceptedFiles: FileWithPath[], onUpload?: (media: Media) => Promise<void> | void) => Promise<unknown>;
  uploadFile: (file: FileWithPath, url: string) => Promise<void>;
  uploadFiles: (files: any, uploadUrls: string[]) => Promise<void>;
}

const UploadContext = createContext<UploadContextType>(
  {} as UploadContextType
);

export function UploadProvider({ children }: { children: ReactNode }): JSX.Element {
  const [ files, setFiles ] = useState<UploadedFile[]>([]);
  const [ uploadSpeed, setUploadSpeed ] = useState(0);

  const uploadFile = async (file: any, url: string): Promise<void> => {
    await fetch(url, {
      method: 'PUT',
      body: file,
    });
  }

  const uploadFiles = async (acceptedFiles: any, uploadUrls: string[]): Promise<void> => {
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
        const uploadUrl = uploadUrls.shift();

        logger.debug('Uploading file...', file);

        const start = performance.now();

        setFiles(fs => fs.map(f => f.path === file.path ? { ...f, isUploading: true } : f));

        await uploadFile(file as File, uploadUrl as string);

        setUploadSpeed((file.size / ((performance.now() - start) / 1000)) * 3);

        setFiles(fs => fs.map(f => f.path === file.path ? { ...f, isUploading: false, isDone: true } : f));
      }
    };

    await Promise.all(Array.from({ length: 2 }, () => worker()));
  }

  const onDrop = async (acceptedFiles: FileWithPath[], onUpload?: (media: Media) => Promise<void> | void): Promise<unknown> => {
    const startTime = performance.now();

    setFiles(files.concat(acceptedFiles.map(file => ({
        ...file,
        name: file.name,
        type: file.type,
        size: file.size,
        preview: URL.createObjectURL(file),
        isUploading: true,
      })),
    ));

    const mediaList: Media[] = [];

    const uploadOne = async () => {
      while (acceptedFiles.length > 0) {
        const file = acceptedFiles.shift();

        if (typeof file === 'undefined') {
          return;
        }

        const start = performance.now();
        
        const media = await uploadPhoto(file as File);

        setUploadSpeed((file.size / ((performance.now() - start) / 1000)) * 3);

        mediaList.push(media);

        setFiles((fs) => fs.map(f => {
          if (f.path === file.path) {
            return {
              ...f,
              media,
              isUploading: false,
            };
          }

          return f;
        }));

        if (typeof onUpload === 'function' && onUpload.constructor.name === 'AsyncFunction') {
          await onUpload(media);
        }

        if (typeof onUpload === 'function' && onUpload.constructor.name === 'Function') {
          onUpload(media);
        }
      }
    };

    await Promise.all(Array.from({ length: 3 }, () => uploadOne()));

    const endTime = performance.now();
    console.log(`Upload took ${endTime - startTime} milliseconds`);
    console.log(`Upload took ${(endTime - startTime) / 1000} seconds`);

    return mediaList;
  };

  function clear() {
    setFiles([]);
  }

  const memoedValue = useMemo(
    () => ({
      files,
      uploadSpeed,
      clear,
      onDrop,
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
