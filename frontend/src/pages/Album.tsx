import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { useParams } from 'react-router-dom';
import SEO from '../components/SEO';
import Gallery from './album/Gallery';
import { getAlbum } from '../api/services';

const Album: React.FC = () => {
  const params = useParams();
  const [ files, setFiles ] = useState([] as Array<Media>);
  const [ hasError, setHasError ] = useState(false);

  useEffect(() => {
    getAlbum(params.id as string)
      .then((album) => setFiles(album.media))
      .catch(() => setHasError(true));
  }, []);

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
                <Gallery files={files} />
              </Col>
            </Row>
          ) : null
        }
      </Container>
    </SEO>
  );
}

export default Album;
