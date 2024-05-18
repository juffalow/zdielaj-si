"use client"

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import LightGallery from 'lightgallery/react';
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgVideo from 'lightgallery/plugins/video';
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
          {/* <Row>
            {
              files.map(file => (
                <Col key={file.id} className="gallery-item" data-src={file.location.replace('localhost:3010', 'localhost:3014')} lg={12 / cols} md={12 / cols} sm={4} xs={6}>
                  <Image src={file.location.replace('localhost:3010', 'localhost:3014')} alt="" fluid />
                </Col>
              ))
            }
          </Row> */}
          <Row>
            {
              Array(cols).fill(undefined).map((_, index) => (
                <Col key={index}>
                  {
                    files.filter((v, i) => (i + index) % cols === 0).map(file => (
                      <div key={file.id} className="gallery-item mb-4" data-src={file.location.replace('localhost:3010', 'localhost:3014')}>
                        <Image key={file.id} src={file.location.replace('localhost:3010', 'localhost:3014')} alt="" fluid />
                      </div>
                    ))
                  }
                </Col>
              ))
            }
            {/* <Col>
              {
                files.filter((v, index) => index % 4 === 0).map(file => (
                  <Image key={file.id} src={file.location.replace('localhost:3010', 'localhost:3014')} alt="" fluid />
                ))
              }
            </Col>
            <Col>
              {
                files.filter((v, index) => (index + 1) % 4 === 0).map(file => (
                  <Image key={file.id} src={file.location.replace('localhost:3010', 'localhost:3014')} alt="" fluid />
                ))
              }
            </Col>
            <Col>
              {
                files.filter((v, index) => (index + 2) % 4 === 0).map(file => (
                  <Image key={file.id} src={file.location.replace('localhost:3010', 'localhost:3014')} alt="" fluid />
                ))
              }
            </Col>
            <Col>
              {
                files.filter((v, index) => (index + 3) % 4 === 0).map(file => (
                  <div key={file.id} className="gallery-item mb-2" data-src={file.location.replace('localhost:3010', 'localhost:3014')}>
                    <Image src={file.location.replace('localhost:3010', 'localhost:3014')} alt="" fluid />
                  </div>
                ))
              }
            </Col> */}
          </Row>
        </LightGallery>
      </Col>
    </Row>
  );
}
