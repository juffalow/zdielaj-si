import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgVideo from 'lightgallery/plugins/video';
import ImageLoader from '../../components/ImageLoader';
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-video.css';

export default function Gallery({ files }: { files: Array<Media> }) {
  const cols = files.length > 4 ? 4 : files.length;

  return (
    <Row>
      <Col>
        <LightGallery
          plugins={[lgThumbnail, lgVideo]}
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
                        <ImageLoader src={file.thumbnails[0]?.location || file.location} style={{ paddingBottom: '100%' }}>
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
