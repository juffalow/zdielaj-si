import React, { useState, useEffect, useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import ImageGallery from 'react-image-gallery';
import { useParams } from 'react-router-dom';
import 'react-image-gallery/styles/css/image-gallery.css';
import SEO from '../components/SEO';
import DownloadIcon from './album/download-icon-new-white.png';
import VideoPlaceholder from './album/video-placeholder.png';
import './album/album.css';

const Album: React.FC = () => {
  const params = useParams();
  const [ files, setFiles ] = useState([] as Array<any>);
  const [ hasError, setHasError ] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_CORE_URL}/album/${params.id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }
        return response;
      })
      .then(res => res.json())
      .then((json) => setFiles(json.data.photos))
      .catch(() => setHasError(true));
  }, []);

  const onImageClick = (event: any) => {
    const index = (ref as any).current.getCurrentIndex();
    const element = document.createElement('a');
    element.href = files[index].location;
    element.download = files[index].location.substr(files[index].location.lastIndexOf('/') + 1);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    event.preventDefault();
    return false;
  }

  return (
    <SEO title="" description="">
      <Container>
        {
          hasError ? (
            <Alert variant="danger">
              Tento album už nie je dostupný.
            </Alert>
          ) : null
        }
        {
          files.length > 0 ? (
            <Row>
              <Col>
                <ImageGallery items={files.map((file) => {
                  return {
                    original: file.mimetype.startsWith('video/') ? VideoPlaceholder : file.location,
                    thumbnail: file.mimetype.startsWith('video/') ? VideoPlaceholder : file.thumbnail.location,
                  };
                })}
                ref={ref}
                lazyLoad={true}
                showPlayButton={false}
                renderCustomControls={() => {
                  return (
                    <a
                      href=''
                      className='image-gallery-download-button'
                      onClick={onImageClick}
                    >
                      <img src={DownloadIcon} style={{ maxWidth: '100%' }} />
                    </a>
                  )
                }} />
              </Col>
            </Row>
          ) : null
        }
      </Container>
    </SEO>
  );
}

export default Album;
