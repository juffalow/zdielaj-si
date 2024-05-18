"use client"

import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Preview from './Preview';
import PreviewLoader from './PreviewLoader';
import { getAlbums } from '../../../api/services';

export default function Loader() {
  const [ albums, setAlbums ] = useState<Array<Album> | null>(null);
  const [ hasError, setHasError ] = useState(false);

  useEffect(() => {
    getAlbums()
      .then((albums) => setAlbums(albums))
      .catch(() => setHasError(true));
  }, []);


  if (hasError) {
    return (
      <Alert variant="danger">
        Chyba pri načítaní albumov.
      </Alert>
    )
  }

  if (albums === null) {
    return (
      <Row>
        <Col lg={3} md={4} sm={4} xs={6} className="mb-4">
          <PreviewLoader />
        </Col>
        <Col lg={3} md={4} sm={4} xs={6} className="mb-4" style={{ opacity: 0.4 }}>
          <PreviewLoader />
        </Col>
        <Col lg={3} md={4} sm={4} xs={6} className="mb-4" style={{ opacity: 0.2 }}>
          <PreviewLoader />
        </Col>
      </Row>
    );  
  }

  if (albums !== null && albums.length === 0) {
    return (
      <Alert variant="info">
        Nemáš vytvorené žiadne albumy.
      </Alert>
    );
  }

  return (
    <Row>                
    {
      albums.map((album) => (
        <Col key={album.id} lg={3} md={4} sm={4} xs={6} className="mb-4">
          <Preview album={album} />
        </Col>
      ))
    }
    </Row>
  );
}
