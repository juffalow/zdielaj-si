import { useLayoutEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import LightGallery from 'lightgallery/react';
import lgVideo from 'lightgallery/plugins/video';
import ImageLoader from '../../components/ImageLoader';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-video.css';

export default function Gallery({ files }: { files: Array<Media> }) {  
  const innerWidth = window.innerWidth;
  const [cols, setCols] = useState(innerWidth < 768 ? 2 : innerWidth < 992 ? 4 : innerWidth < 1200 ? 6 : innerWidth < 1600 ? 6 : 6);

  useLayoutEffect(() => {
    function updateSize() {
      const innerWidth = window.innerWidth;
      setCols(innerWidth < 768 ? 2 : innerWidth < 992 ? 4 : innerWidth < 1200 ? 6 : innerWidth < 1600 ? 6 : 6);
    }
    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <Row>
      <Col>
        <LightGallery
          plugins={[lgVideo]}
          download={true}
          mobileSettings={{download: true}}
          selector=".gallery-item"
        >
          <Row>
            {
              Array(cols).fill(undefined).map((_, index) => (
                <Col key={index}>
                  {
                    files.filter((v, i) => ((i - index) % cols) === 0).map(file => (
                      <div key={file.id} className="gallery-item mb-4" data-src={file.location}>
                        <ImageLoader src={file.thumbnails[0]?.location || file.location} onVisible={true}>
                          <Image key={file.id} src={file.thumbnails[0]?.location || file.location} alt="" width="100%" fluid />
                        </ImageLoader>
                      </div>
                    ))
                  }
                </Col>
              ))
            }
          </Row>
        </LightGallery>
      </Col>
    </Row>
  );
}
