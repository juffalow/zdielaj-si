import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Preview from './albums/Preview';
import { getAlbums } from '../api/services';
import SEO from '../components/SEO';

const Albums: React.FC = () => {
  const [ albums, setAlbums ] = useState<Array<Album> | null>(null);
  const [ hasError, setHasError ] = useState(false);

  useEffect(() => {
    getAlbums()
      .then((albums) => setAlbums(albums))
      .catch(() => setHasError(true));
  }, []);

  return (
    <SEO title="" description="">
      <Container>
        {
          hasError ? (
            <Alert variant="danger">
              Chyba pri načítaní albumov.
            </Alert>
          ) : null
        }
        {
          albums !== null && albums.length === 0 ? (
            <Alert variant="info">
              Nemáš vytvorené žiadne albumy.
            </Alert>
          ) : null
        }
        {
          albums !== null && albums.length > 0 ? (
            <Row>                
            {
              albums.map((album) => (
                <Col key={album.id} lg={3} md={4} sm={4} xs={6} className="mb-4">
                  <Preview album={album} />
                </Col>
              ))
            }
            </Row>
          ) : null
        }
      </Container>
    </SEO>
  );
}

export default Albums;
