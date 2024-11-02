import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router-dom';
import AlbumPreview from '../components/AlbumPreview';
import AlbumPreviewLoader from '../components/AlbumPreviewLoader';
import BarLoader from '../components/BarLoader';
import SEO from '../components/SEO';
import { getPublicProfile, getPublicProfileAlbums } from '../api/services';

const PublicProfile: React.FC = () => {
  const params = useParams();
  const [ publicProfile, setPublicProfile ] = useState<PublicProfile | undefined>();
  const [ albums, setAlbums ] = useState<Album[] | null>(null);
  const [ hasError, setHasError ] = useState(false);

  useEffect(() => {
    getPublicProfile(params.id as string)
      .then((publicProfile) => {
        setPublicProfile(publicProfile);
        return publicProfile?.id;
      }).then((id: ID) => getPublicProfileAlbums({ publicProfileId: id }))
      .then((response) => {
        const albums = response.data.albums;
        setAlbums(albums);
      })
      .catch(() => setHasError(true));
  }, []);

  return (
    <SEO title="" description="">
      <Container fluid="xl">
        {
          hasError ? (
            <Alert variant="danger">
              Tento album už nie je dostupný.
            </Alert>
          ) : null
        }
        {
          typeof publicProfile === 'undefined' ? (
            <>
              <BarLoader As="h1">&nbsp;</BarLoader>
              <BarLoader As="p">&nbsp;</BarLoader>
            </>
          ) : null
        }
        {
          typeof publicProfile !== 'undefined' ? (
            <>
              <h1 className="text-center">{publicProfile.name}</h1>
              <p className="text-center lead">{publicProfile.description}</p>
            </>
          ) : null
        }
        { albums === null ? (
            <Row>
              <Col lg={3} md={4} sm={4} xs={6} className="mb-4">
                <AlbumPreviewLoader />
              </Col>
              <Col lg={3} md={4} sm={4} xs={6} className="mb-4" style={{ opacity: 0.4 }}>
                <AlbumPreviewLoader />
              </Col>
              <Col lg={3} md={4} sm={4} xs={6} className="mb-4" style={{ opacity: 0.2 }}>
                <AlbumPreviewLoader />
              </Col>
            </Row>
          ) : null
        }
        {
          albums !== null && albums.length > 0 ? (
            <Row>                
            {
              albums.map((album) => (
                <Col key={album.id} lg={3} md={4} sm={4} xs={6} className="mb-4">
                  <AlbumPreview album={album} />
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

export default PublicProfile;
