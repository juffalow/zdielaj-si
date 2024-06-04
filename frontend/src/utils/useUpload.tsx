import {
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from 'react';
import { FileWithPath } from 'react-dropzone';
import { uploadPhoto } from '../api/services';

interface UploadContextType {
  files: FileWithPath[];
  clear: () => void,
  onDrop: (acceptedFiles: FileWithPath[], onUpload?: (media: Media) => Promise<void> | void) => Promise<unknown>;
}

const UploadContext = createContext<UploadContextType>(
  {} as UploadContextType
);

export function UploadProvider({ children }: { children: ReactNode }): JSX.Element {
  const [ files, setFiles ] = useState<FileWithPath[]>([]);

  const onDrop = async (acceptedFiles: FileWithPath[], onUpload?: (media: Media) => Promise<void> | void): Promise<unknown> => {
    const startTime = performance.now()

    setFiles([
      ...files,
      ...acceptedFiles.map(file => ({
        ...file,
        preview: URL.createObjectURL(file),
        isUploading: true,
      })),
    ]);

    const mediaList: any = [];

    const uploadOne = async () => {
      while (acceptedFiles.length > 0) {
        const file = acceptedFiles.shift();

        if (typeof file === 'undefined') {
          return;
        }

        const media = await uploadPhoto(file as File);
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
      clear,
      onDrop,
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
