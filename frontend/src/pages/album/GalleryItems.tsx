import type { HTMLAttributes } from 'react'
import Image from 'react-bootstrap/Image';
import ImageLoader from '../../components/ImageLoader';

export default function GalleryItems({ files, cols, innerWidth }: { files: Array<Media>, cols: number, innerWidth: number }) {
  const space = 20;
  const width = (innerWidth - (space * (cols - 1))) / cols;
  const top = Array(cols).fill(0);
  const galleryWidth = files.length > cols ? '100%' : files.length * width + (space * (files.length - 1)) + 'px';
  let left = 0;

  const elements = files.map((file, index) => {
    { left += width + 20 }
    { index % cols === 0 && (left = 0) }

    const element = file.mimetype.startsWith('video') ? <GalleryVideo file={file} style={{ position: 'absolute', left, top: top[index % cols], width }} />
      : <GalleryImage file={file} style={{ position: 'absolute', left, top: top[index % cols], width }} />;

    { top[index % cols] += ((file.metadata.height * (width / file.metadata.width))) + 20 }

    return element;
  });

  const galleryHeight = Math.max(...top);

  return (
    <div style={{ position: 'relative', height: galleryHeight }}>
      <div style={{ position: 'relative', height: '100%', width: galleryWidth, margin: '0 auto' }}>
        {elements}
      </div>
    </div>
  )
}

const GalleryImage = ({ file, ...props }: { file: Media } & HTMLAttributes<HTMLElement>) => (
  <div
    key={file.id}
    className="gallery-item mb-4"
    data-src={file.location}
    {...props}
  >
    <ImageLoader src={file.thumbnails[1] || file.location} onVisible={true}>
      <Image src={file.thumbnails[1] || file.thumbnails[0] || file.location} alt="" width="100%" fluid />
    </ImageLoader>
  </div>
);

const GalleryVideo = ({ file, ...props }: { file: Media }  & HTMLAttributes<HTMLElement>) => (
  <div
    key={file.id}
    className="gallery-item mb-4"
    data-download-url={file.location}
    data-poster={file.thumbnails[1] || file.thumbnails[0] || file.location}
    data-lg-size="1280-720"
    data-video={`{"source": [{"src":"${(file as any).conversions[0]}", "type":"video/mp4"}], "attributes": {"preload": false, "controls": true}}`}
    {...props}
  >
    <ImageLoader src={file.thumbnails[1] || file.location} onVisible={true}>
      <Image key={file.id} src={file.thumbnails[1] || file.thumbnails[0] || file.location} alt="" width="100%" fluid />
    </ImageLoader>
  </div>
);
