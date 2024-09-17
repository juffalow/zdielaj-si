import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { useParams, useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import GalleryLoader from './album/GalleryLoader';
import GalleryNew from './album/GalleryNew';
import { getAlbum } from '../api/services';
import useUpload from '../utils/useUpload';
import UploadedFiles from '../components/UploadedFiles';

const Album: React.FC = () => {
  const params = useParams();
  const location = useLocation();
  const [ album, setAlbum ] = useState<Album | undefined>(location.state?.album);
  const [ hasError, setHasError ] = useState(false);
  const {
    files: uploadedFiles
  } = useUpload();

  useEffect(() => {
    if (uploadedFiles.length > 0) {
      return;
    }

    getAlbum(params.id as string)
      .then(album => { setAlbum(album); return album; })
      .catch(() => setHasError(true));
  }, []);

  return (
    <SEO title="" description="">
      <Container fluid>
        {
          uploadedFiles.length > 0 ? (
            <UploadedFiles album={album as Album} />
          ) : null
        }
        {
          hasError ? (
            <Row>
              <Col md={{ span: 6, offset: 3 }}>
                <Alert variant="danger" className="text-center">
                  Tento album už nie je dostupný.
                </Alert>
              </Col>
            </Row>
          ) : null
        }
        {
          typeof album === 'undefined' && hasError === false ? (
            <GalleryLoader />
          ) : null
        }
        {
          typeof album !== 'undefined' && 'media' in album && album.media.length > 0 ? (
            <Row>
              <Col>
                <GalleryNew files={album.media} />
              </Col>
            </Row>
          ) : null
        }
      </Container>
    </SEO>
  );
}

export default Album;
