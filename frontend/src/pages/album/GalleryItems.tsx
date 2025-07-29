import { useLayoutEffect, useState } from 'react'
import type { HTMLAttributes } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import ImageLoader from '../../components/ImageLoader';
import styles from './GalleryItems.module.css';

export default function GalleryItems({ files, layout, gaps }: { files: Array<Media>, layout: 'cols' | 'tiles' | 'rows', gaps: 'none' | 'small' | 'medium' | 'large' }) {
  const screenWidth = window.innerWidth;
  const [ cols, setCols ] = useState(screenWidth >= 1200 ? 6 :
    screenWidth >= 992 ? 4 :
    screenWidth >= 768 ? 3 : 2);

  useLayoutEffect(() => {
    function updateSize() {
      const screenWidth = window.innerWidth;
      setCols(screenWidth >= 1200 ? 6 :
        screenWidth >= 992 ? 4 :
        screenWidth >= 768 ? 3 : 2);
    }
    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  if (layout === 'cols') {
    return (
      <Row>
        {
          new Array(cols).fill(null).map((_, col) => (
            <Col>
              {
                files.filter((_, index) => index % cols === col).map((file) => (
                  file.mimetype.startsWith('video') ? <GalleryVideo key={file.id} file={file} className={styles.brick} />
                    : <GalleryImage key={file.id} file={file} className={`gallery-item ${styles.brick} ${gaps === 'none' ? 'p-0' : gaps === 'small' ? 'p-1' : gaps === 'medium' ? 'p-3' : 'p-5'}`} />
                ))
              }
            </Col>
          ))
        }
      </Row>
    );
  }


  return (
    <div className={`${styles.masonry} ${layout === 'tiles' ? styles.tiles : styles.rows}`} style={{ position: 'relative', height: '100%', width: '100%', margin: '0 auto' }}>
      {
        files.map((file) => (
          file.mimetype.startsWith('video') ? <GalleryVideo key={file.id} file={file} className={styles.brick} />
            : <GalleryImage key={file.id} file={file} className={`gallery-item ${styles.brick} ${gaps === 'none' ? 'p-0' : gaps === 'small' ? 'p-1' : gaps === 'medium' ? 'p-3' : 'p-5'}`} />
        ))
      }
    </div>
  )
}

const GalleryImage = ({ file, ...props }: { file: Media } & HTMLAttributes<HTMLElement>) => (
  <div
    key={file.id}
    className="gallery-item"
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
