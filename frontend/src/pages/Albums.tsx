import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Preview from './albums/Preview';
import PreviewLoader from './albums/PreviewLoader';
import { getAlbums, deleteAlbum } from '../api/services';
import SEO from '../components/SEO';

const Albums: React.FC = () => {
  const [ album, setAlbum ] = useState<Album | null>(null);
  const [ albums, setAlbums ] = useState<Array<Album> | null>(null);
  const [ hasError, setHasError ] = useState(false);
  const [ isModalOpen, setIsModalOpen ] = useState(false);

  useEffect(() => {
    getAlbums()
      .then((albums) => setAlbums(albums))
      .catch(() => setHasError(true));
  }, []);

  const onDelete = (album: Album) => {
    setAlbum(album);
    setIsModalOpen(true);
  }

  const onModalClose = () => {
    setAlbum(null);
    setIsModalOpen(false);
  }

  const onModalConfirm = async () => {
    if (album === null) {
      setIsModalOpen(false);
      return;
    }

    await deleteAlbum(parseInt(album.id)).then(() => {
      setAlbum(null);
      setIsModalOpen(false);

      if (albums === null || albums.length === 0) {
        return;
      }

      const newAlbums = albums.filter((a) => a.id !== album.id);
      setAlbums(newAlbums);
    });
  }

  return (
    <SEO title="Albumy" description="">
      <Container fluid="xl">
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
        { albums === null ? (
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
          ) : null
        }
        {
          albums !== null && albums.length > 0 ? (
            <Row>                
            {
              albums.map((album) => (
                <Col key={album.id} lg={3} md={4} sm={4} xs={6} className="mb-4">
                  <Preview album={album} onDelete={onDelete} />
                </Col>
              ))
            }
            </Row>
          ) : null
        }
        <Modal show={isModalOpen} onHide={onModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Vymazať album</Modal.Title>
          </Modal.Header>
          <Modal.Body>Naozaj chcete vymazať tento album?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onModalClose}>
              Zatvoriť
            </Button>
            <Button variant="danger" onClick={onModalConfirm}>
              Vymazať
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </SEO>
  );
}

export default Albums;
