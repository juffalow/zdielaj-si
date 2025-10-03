import { Image } from '@heroui/react';

export default function GalleryItems({ files, layout, gaps }: { files: Array<AlbumFile>, layout: 'cols' | 'tiles' | 'rows', gaps: 'none' | 'small' | 'medium' | 'large' }) {
  if (layout === 'cols') {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-2 gap-2">
          {
            files.map(file => {
              if ('id' in file === false) {
                return (
                  <div key={(file as any).name} style={{ aspectRatio: '1/1' }} className="justify-self-stretch">
                    <Image src={(file as any).preview} radius="sm" width="100%" height="100%" classNames={{ wrapper: 'h-full w-full bg-cover max-w-none', img: 'object-cover object-cente gallery-item' }} />
                  </div>
                )
              }

              return (
                <div key={file.id} style={{ aspectRatio: '1/1' }} className="justify-self-stretch">
                  {/* <Image key={file.id} src={file.thumbnails[1] || file.thumbnails[0] || file.location} fallbackSrc={noPreview} width="100%" height="100%" classNames={{ wrapper: 'h-full w-full bg-cover max-w-none', img: 'object-cover object-center' }} /> */}
                  <Image key={file.id} src={file.thumbnails[1] || file.thumbnails[0] || file.location} radius="sm" width="100%" height="100%" classNames={{ wrapper: 'h-full w-full bg-cover max-w-none', img: 'object-cover object-cente gallery-item' }} />
                </div>
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
