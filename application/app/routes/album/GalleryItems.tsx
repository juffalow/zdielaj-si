import { Image } from '@heroui/react';
import type { HTMLAttributes } from 'react';

export default function GalleryItems({ files, layout, gaps }: { files: Array<AlbumFile>, layout: 'cols' | 'tiles' | 'rows', gaps: 'none' | 'small' | 'medium' | 'large' }) {
  if (layout === 'cols') {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-2">
          {
            files.map(file => {
              if ('id' in file === false) {
                return (
                  <GalleryImage key={(file as any).name} file={file} style={{ aspectRatio: '1/1' }} />
                )
              }

              return file.mimetype.startsWith('video') ? (
                <GalleryVideo key={file.id} file={file} style={{ aspectRatio: '1/1' }} />
              ) : (
                <GalleryImage key={file.id} file={file} style={{ aspectRatio: '1/1' }} />
              )
            })
          }
      </div>
    );
  }
  
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="grid gap-4">
          {
            files.map((file, index) => {
              if ('id' in file === false) {
                return (
                  <div key={(file as any).name} className={`order-${index + 1}`}>
                    <img src={(file as any).preview} className="h-auto max-w-full rounded-lg" />
                  </div>
                )
              }
              return (
                <div key={file.id} className={`order-${index + 1}`}>
                  <img src={file.thumbnails[1] || file.thumbnails[0] || file.location} className="h-auto max-w-full rounded-lg" />
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

const GalleryImage = ({ file, ...props }: { file: AlbumFile } & HTMLAttributes<HTMLElement>) => (
  <div
    className="gallery-item justify-self-stretch"
    data-src={file.location || (file as any).preview}
    {...props}
  >
    <Image
      src={(file as any).preview || file.thumbnails[1] || file.thumbnails[0] || file.location}
      radius="sm"
      width="100%"
      height="100%"
      classNames={{ wrapper: 'h-full w-full bg-cover max-w-none', img: 'object-cover object-center' }}
    />
  </div>
);

const GalleryVideo = ({ file, ...props }: { file: AlbumFile }  & HTMLAttributes<HTMLElement>) => (
  <div
    className="gallery-item justify-self-stretch"
    data-download-url={file.location}
    data-poster={file.thumbnails[1] || file.thumbnails[0] || file.location}
    data-lg-size="1280-720"
    data-video={`{"source": [{"src":"${(file as any).video}", "type":"video/mp4"}], "attributes": {"preload": false, "controls": true}}`}
    {...props}
  >
    <Image
      src={(file as any).preview || file.thumbnails[1] || file.thumbnails[0] || file.location}
      radius="sm"
      width="100%"
      height="100%"
      classNames={{ wrapper: 'h-full w-full bg-cover max-w-none', img: 'object-cover object-center' }}
    />
  </div>
);
