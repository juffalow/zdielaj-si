import { Button, Image, Spinner } from '@heroui/react';
import type { HTMLAttributes } from 'react';
import { FaCloudDownloadAlt } from 'react-icons/fa';
import styles from './GalleryItems.module.css';
import { useFeatureFlags } from '../../utils/useFeatureFlags';

async function downloadImage(imageSrc: string) {
  const image = await fetch(imageSrc);
  const imageBlog = await image.blob();
  const imageURL = URL.createObjectURL(imageBlog);

  const link = document.createElement('a');
  link.href = imageURL;
  link.download = 'image file name here';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export default function GalleryItems({
  files,
  layout,
}: {
  files: (AlbumFile | UploadedFile)[];
  layout: 'cols' | 'tiles' | 'rows';
  gaps: 'none' | 'small' | 'medium' | 'large';
}) {
  const features = useFeatureFlags();

  if (layout === 'cols') {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-2">
        {files.map((file) => {
          if ('id' in file === false) {
            return (file as any).type.startsWith('video') ? (
              <GalleryVideo key={(file as any).name} file={file} style={{ aspectRatio: '1/1' }} />
            ) : (
              <GalleryImage key={(file as any).name} file={file} downloadButton={features.downloadbutton} style={{ aspectRatio: '1/1' }} />
            );
          }

          return file.mimetype.startsWith('video') ? (
            <GalleryVideo key={file.id} file={file} style={{ aspectRatio: '1/1' }} />
          ) : (
            <GalleryImage key={file.id} file={file} downloadButton={features.downloadbutton} style={{ aspectRatio: '1/1' }} />
          );
        })}
      </div>
    );
  }

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="grid gap-4">
          {files.map((file, index) => {
            if ('id' in file === false) {
              return (
                <div key={(file as any).name} className={`order-${index + 1}`}>
                  <img src={(file as any).preview} className="h-auto max-w-full rounded-lg" />
                </div>
              );
            }
            return (
              <div key={file.id} className={`order-${index + 1}`}>
                <img
                  src={file.thumbnails[1] || file.thumbnails[0] || file.location}
                  className="h-auto max-w-full rounded-lg"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const GalleryImage = ({ file, downloadButton, ...props }: { file: AlbumFile | UploadedFile, downloadButton?: boolean } & HTMLAttributes<HTMLElement>) => {
  return (
    <div className="relative">
      {downloadButton && 'preview' in file === false ? (
        <Button
          isIconOnly
          aria-label="Download"
          color="primary"
          variant="solid"
          className="absolute top-2 right-2 z-999"
          data-tracking-id="album_download_button_click"
          style={{ fontSize: '1.2rem' }}
          onPress={() => downloadImage(file.location)}
        >
          <FaCloudDownloadAlt />
        </Button>
      ) : null}
      <div
        className="gallery-item justify-self-stretch"
        data-src={'preview' in file ? file.preview : file.location}
        {...props}
      >
        <Image
          src={'preview' in file ? file.preview : file.thumbnails[1] || file.thumbnails[0] || file.location}
          radius="sm"
          width="100%"
          height="100%"
          classNames={{
            wrapper: 'h-full w-full bg-cover max-w-none',
            img: 'object-cover object-center',
          }}
        />

        {'isDone' in file && file.isDone === false && (
          <Spinner
            classNames={{
              base: `absolute w-full h-full inset-0 z-999 ${styles.bgGrayOpaque}`,
            }}
            color={file.isUploading ? 'success' : 'primary'}
          />
        )}
        {'hasError' in file && file.hasError === true && (
          <div
            className={`absolute w-full h-full inset-0 z-999 flex items-center justify-center ${styles.bgGrayOpaque}`}
          >
            <span className="text-red-500 text-2xl">&gt; 10MB</span>
          </div>
        )}
      </div>
    </div>
  );
};

const GalleryVideo = ({ file, ...props }: { file: AlbumFile | UploadedFile } & HTMLAttributes<HTMLElement>) => {
  if ('preview' in file) {
    return (
      <div
        className="gallery-item justify-self-stretch"
        data-download-url={file.preview}
        data-poster={file.preview}
        data-lg-size="1280-720"
        data-video={`{"source": [{"src":"${file.preview}", "type":"video/mp4"}], "attributes": {"preload": false, "controls": true}}`}
        {...props}
      >
        {file.isDone === false && (
          <Spinner
            classNames={{
              base: `absolute w-full h-full inset-0 z-999 ${styles.bgGrayOpaque}`,
            }}
            color={file.isUploading ? 'success' : 'primary'}
          />
        )}
        <video
          src={file.preview}
          className="h-full w-full bg-cover max-w-none object-cover object-center rounded-sm"
          autoPlay
        />
      </div>
    );
  }

  return (
    <div
      className="gallery-item justify-self-stretch"
      data-download-url={file.location}
      data-poster={file.thumbnails[1] || file.thumbnails[0] || file.location}
      data-lg-size="1280-720"
      data-video={`{"source": [{"src":"${(file as any).video}", "type":"video/mp4"}], "attributes": {"preload": false, "controls": true}}`}
      {...props}
    >
      <Image
        src={file.thumbnails[1] || file.thumbnails[0] || file.location}
        radius="sm"
        width="100%"
        height="100%"
        classNames={{
          wrapper: 'h-full w-full bg-cover max-w-none',
          img: 'object-cover object-center',
        }}
      />
    </div>
  );
};
