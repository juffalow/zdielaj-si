import React, { useState, useEffect, useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import { useDropzone } from 'react-dropzone';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Thumbnail from './home/Thumbnail';
import AddPhotoCard from './home/AddPhotoCard';
import FeaturesList from './home/FeaturesList';
import SEO from '../components/SEO';
import ShareableLink from './home/ShareableLink';
import { uploadPhotos, uploadPhoto } from '../api/services';

const Home: React.FC = () => {
  const [ files, setFiles ] = useState([] as Array<any>);
  const [ albumId, setAlbumId ] = useState('');
  const [ hasError, setHasError ] = useState(false);

  const onDrop = useCallback(async (acceptedFiles) => {
    setFiles(acceptedFiles.map((file: any) => {
      return { ...file, preview: URL.createObjectURL(file) };
    }));

    const files = [ acceptedFiles.shift() ];
    const album = await uploadPhotos(files);

    setAlbumId(album.id);

    for (const file of acceptedFiles) {
      await uploadPhoto(album.id, file);
    }
  }, []);

  const onSingleDrop = useCallback(acceptedFiles => {
    setFiles([ ...files, { ...acceptedFiles[0], preview: URL.createObjectURL(acceptedFiles[0]) }]);

    uploadPhoto(albumId, acceptedFiles[0])
      .then(album => setAlbumId(album.id))
      .catch(() => setHasError(true));
  }, [ files, albumId ]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({ onDrop, accept: 'image/*', maxFiles: 50 });

  const {
    getRootProps: getSingleRootProps,
    getInputProps: getSingleInputProps,
  } = useDropzone({ onDrop: onSingleDrop, accept: 'image/*', maxFiles: 50 });

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <SEO title="" description="Tiež máš problém, že ti Messenger zníži kvalitu fotiek? Tu ich môžeš zdielať bez problémov v plnej kvalite!">
      <Container>
        <Row>
          <Col>
            <h1>Zdieľaj si fotky v plnej kvalite</h1>
            <p className="lead">Tiež máš problém, že ti Messenger zníži kvalitu fotiek? Tu ich môžeš zdielať bez problémov v plnej kvalite!</p>
            <div {...getRootProps()} style={{ border: '1px #28a745 dashed', padding: '40px', borderRadius: '20px', textAlign: 'center', marginTop: 50 }}>
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <p>Presuň sem fotky...</p> :
                  <p style={{ marginBottom: 0 }}>Presuň sem fotky alebo ich vyber kliknutím</p>
              }
              <div style={{ marginTop: 20 }}>
                <Button variant="success">Nahrať fotky</Button>
              </div>
            </div>
          </Col>
        </Row>
        {
          files.length > 0 ? (
            <>
              <Row style={{ marginTop: 50 }}>
                <Col>
                  <h2 style={{ display: 'inline-block' }}>Tvoje fotky</h2>
                  <p>Svoje fotky môžeš teraz zdieľať pomocou nižšie uvedenej url adresy, alebo doplniť ďaľšie fotky kliknutím na tlačítko plus (+).</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <ShareableLink albumId={albumId} />
                </Col>
              </Row>
              <Row style={{ marginTop: 30 }}>
                {
                  files.map((file: any, index: number) => (
                    <Col lg={2} md={2} sm={3} xs={files.length === 1 ? true : 6} key={`${index}-${file.path}`}>
                      <Thumbnail file={file} />
                    </Col>
                  ))
                }
                <Col lg={2} md={2} sm={3} xs={files.length === 1 ? true : 6}>
                  <div {...getSingleRootProps()} style={{ border: '1px #28a745 dashed', borderRadius: '20px', textAlign: 'center' }}>
                    <input {...getSingleInputProps()} />
                    <AddPhotoCard />
                  </div>
                </Col>
              </Row>
            </>
          ) : null
        }
        <Row style={{ marginTop: 50 }}>
          <Col lg="6" md="6" sm="6" xs="12">
            <p style={{ marginBottom: '0.2em' }}>Zadarmo ako neprihlásený užívateľ:</p>
            <FeaturesList>
              <li>môžeš zdieľať maximálne 10 fotiek naraz</li>
              <li>fotky budú po 24h automaticky zmazané</li>
            </FeaturesList>
          </Col>
          <Col lg="6" md="6" sm="6" xs="12">
            <p style={{ marginBottom: '0.2em' }}>Zadarmo ako prihlásený užívateľ:</p>
            <FeaturesList>
              <li>môžeš zdieľať maximálne 50 fotiek naraz</li>
              <li>fotky budú po 24h automaticky zmazané</li>
              <li>môžeš vidieť zoznam svojich pridaných fotiek</li>
            </FeaturesList>
            <p style={{ marginBottom: '0.2em' }}>Čoskoro:</p>
            <ul>
              <li>nové formáty (video, text)</li>
              <li>zaheslovať prístup</li>
            </ul>
          </Col>
        </Row>
      </Container>
    </SEO>
  );
}

export default Home;
