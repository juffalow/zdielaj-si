import type { HTMLAttributes } from 'react'
import Image from 'react-bootstrap/Image';
import ImageLoader from '../../components/ImageLoader';
import styles from './GalleryItems.module.css';

export default function GalleryItems({ files, layout }: { files: Array<Media>, layout: 'cols' | 'tiles' | 'rows' }) {
  return (
    <div className={`${styles.masonry} ${layout === 'cols' ? styles.cols : styles.rows}`} style={{ position: 'relative', height: '100%', width: '100%', margin: '0 auto' }}>
      {
        files.map((file) => (
          file.mimetype.startsWith('video') ? <GalleryVideo key={file.id} file={file} className={styles.brick} />
            : <GalleryImage key={file.id} file={file} className={`gallery-item ${styles.brick}`} />
        ))
      }
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
