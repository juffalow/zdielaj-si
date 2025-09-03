import { useLayoutEffect, useState } from 'react'
import type { HTMLAttributes } from 'react'
import { Image } from '@heroui/react';
import noPreview from '../../images/nopreview.png';

export default function GalleryItems({ files, layout, gaps }: { files: Array<AlbumFile>, layout: 'cols' | 'tiles' | 'rows', gaps: 'none' | 'small' | 'medium' | 'large' }) {
  const cols = 4;

  if (layout === 'cols') {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-2">
          {
            files.map(file => (
              <div key={file.id} style={{ aspectRatio: '1/1' }} className="justify-self-stretch">
                {/* <Image key={file.id} src={file.thumbnails[1] || file.thumbnails[0] || file.location} fallbackSrc={noPreview} width="100%" height="100%" classNames={{ wrapper: 'h-full w-full bg-cover max-w-none', img: 'object-cover object-center' }} /> */}
                <Image key={file.id} src={file.thumbnails[1] || file.thumbnails[0] || file.location} radius="sm" width="100%" height="100%" classNames={{ wrapper: 'h-full w-full bg-cover max-w-none', img: 'object-cover object-cente gallery-item' }} />
              </div>
            ))
          }
      </div>
    );
  }
  
  return (
    <div className="flex justify-center">
    {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-4"> */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div className="grid gap-4">
      {/* {
        files.map((file) => (
          file.mimetype.startsWith('video') ? <GalleryVideo key={file.id} file={file} className={styles.brick} />
            : <GalleryImage key={file.id} file={file} className={`gallery-item ${styles.brick} ${gaps === 'none' ? 'p-0' : gaps === 'small' ? 'p-1' : gaps === 'medium' ? 'p-3' : 'p-5'}`} />
        ))
      } */}
      {
        files.map((file, index) => (
          <div key={file.id} className={`order-${index + 1}`}>
            <img src={file.thumbnails[1] || file.thumbnails[0] || file.location} className="h-auto max-w-full rounded-lg" />
          </div>
        ))
      }
    {/* </div> */}
    </div>
    </div>
    </div>
  )
}

// const GalleryImage = ({ file, ...props }: { file: Media } & HTMLAttributes<HTMLElement>) => (
//   <div
//     key={file.id}
//     className="gallery-item"
//     data-src={file.location}
//     {...props}
//   >
//     <ImageLoader src={file.thumbnails[1] || file.location} onVisible={true}>
//       <Image src={file.thumbnails[1] || file.thumbnails[0] || file.location} alt="" width="100%" fluid />
//     </ImageLoader>
//   </div>
// );

// const GalleryVideo = ({ file, ...props }: { file: Media }  & HTMLAttributes<HTMLElement>) => (
//   <div
//     key={file.id}
//     className="gallery-item mb-4"
//     data-download-url={file.location}
//     data-poster={file.thumbnails[1] || file.thumbnails[0] || file.location}
//     data-lg-size="1280-720"
//     data-video={`{"source": [{"src":"${(file as any).conversions[0]}", "type":"video/mp4"}], "attributes": {"preload": false, "controls": true}}`}
//     {...props}
//   >
//     <ImageLoader src={file.thumbnails[1] || file.location} onVisible={true}>
//       <Image key={file.id} src={file.thumbnails[1] || file.thumbnails[0] || file.location} alt="" width="100%" fluid />
//     </ImageLoader>
//   </div>
// );
