import React, { Suspense } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { useParams, useLocation } from 'react-router-dom';
import SEO from '../components/SEO';
import AlbumLoader from './album/AlbumLoader';
import GalleryLoader from './album/GalleryLoader';
import { getAlbum } from '../api/services';
import useFetch from '../utils/useFetch';
import useUpload from '../utils/useUpload';
import UploadedFiles from '../components/UploadedFiles';
import ErrorBoundary from '../components/ErrorBoundary';

const Error = () => (
  <Row>
    <Col md={{ span: 6, offset: 3 }}>
      <Alert variant="danger" className="text-center">
        Tento album už nie je dostupný.
      </Alert>
    </Col>
  </Row>
);

const Album: React.FC = () => {
  const { files } = useUpload();
  const location = useLocation();
  const params = useParams();

  if (files.length > 0) {
    return (
      <SEO title="" description="">
        <Container fluid>
          <UploadedFiles album={location.state?.album} />
        </Container>
      </SEO>
    );
  }

  return (
    <SEO title="" description="">
      <Container fluid>
        <ErrorBoundary fallback={(<Error />)}>
          <Suspense fallback={<GalleryLoader />}>
            <AlbumLoader getAlbum={useFetch<Album>(getAlbum(params.id as string))} />
          </Suspense>
        </ErrorBoundary>
      </Container>
    </SEO>
  );
};

export default Album;
