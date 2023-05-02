import React, { useState, useEffect, useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import { useDropzone } from 'react-dropzone';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Thumbnail from './home/Thumbnail';
import AddPhotoCard from './home/AddPhotoCard';
import FeaturesList from './home/FeaturesList';
import SEO from '../components/SEO';
import ShareableLink from './home/ShareableLink';
import { uploadPhoto, createAlbum, addMedia } from '../api/services';
import GOOGLE_PLAY_LOGO from '../img/google_play_logo.png';
import APP_STORE_LOGO from '../img/app_store_logo.png';

const Home: React.FC = () => {
  const [ files, setFiles ] = useState([] as Array<any>);
  const [ album, setAlbum ] = useState<Album | null>(null);
  const [ hasError, setHasError ] = useState(false);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFiles(acceptedFiles.map((file: File) => {
      return { ...file, preview: URL.createObjectURL(file), isUploading: true };
    }));

    const album = await createAlbum();

    setAlbum(album);

    for (const file of acceptedFiles) {
      const media = await uploadPhoto(file);
      await addMedia(album.id, media.id);

      setFiles((fs) => fs.map(f => {
        if (f.preview === f.preview) {
          return {
            ...f,
            isUploading: false,
          };
        }

        return f;
      }));
    }
  }, []);

  const onSingleDrop = useCallback(async (acceptedFiles: File[]) => {
    setFiles([
      ...files,
      ...acceptedFiles.map((file: File) => {
        return {
          ...file,
          preview: URL.createObjectURL(file),
          isUploading: true,
        };
      }),
    ]);

    if (album === null) {
      return;
    }

    for (const file of acceptedFiles) {
      const media = await uploadPhoto(file);
      await addMedia(album.id, media.id);

      setFiles((fs) => fs.map(f => {
        if (f.preview === f.preview) {
          return {
            ...f,
            isUploading: false,
          };
        }

        return f;
      }));
    }
  }, [ files, album ]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({ onDrop, accept: 'image/*, video/*', maxFiles: 50 });

  const {
    getRootProps: getSingleRootProps,
    getInputProps: getSingleInputProps,
  } = useDropzone({ onDrop: onSingleDrop, accept: 'image/*, video/*', maxFiles: 50 });

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
          album !== null && files.length > 0 ? (
            <>
              <Row style={{ marginTop: 50 }}>
                <Col>
                  <h2 style={{ display: 'inline-block' }}>Tvoje fotky</h2>
                  <p>Svoje fotky môžeš teraz zdieľať pomocou nižšie uvedenej url adresy, alebo doplniť ďaľšie fotky kliknutím na tlačítko plus (+).</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <ShareableLink albumId={album.hash} />
                </Col>
              </Row>
              <Row style={{ marginTop: 30 }}>
                {
                  files.map((file: any, index: number) => (
                    <Col lg={2} md={2} sm={3} xs={files.length === 1 ? true : 6} key={`${index}-${file.path}`}>
                      <Thumbnail file={file} isUploading={file.isUploading} />
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
          <Col lg="4" md="4" sm="4" xs="12">
            <p style={{ marginBottom: '0.2em', fontWeight: 'bold' }}>Zadarmo ako neprihlásený užívateľ:</p>
            <FeaturesList>
              <li>môžeš zdieľať maximálne 10 fotiek naraz</li>
              <li>fotky budú po 24h automaticky zmazané</li>
            </FeaturesList>
          </Col>
          <Col lg="4" md="4" sm="4" xs="12">
            <p style={{ marginBottom: '0.2em', fontWeight: 'bold' }}>Zadarmo ako prihlásený užívateľ:</p>
            <FeaturesList>
              <li>môžeš zdieľať maximálne 50 fotiek naraz</li>
              <li>môžeš zdieľať video</li>
              <li>fotky budú po 24h automaticky zmazané</li>
              <li>môžeš vidieť zoznam svojich pridaných fotiek</li>
            </FeaturesList>
            <p><Link to="/registracia" style={{ color: 'rgb(33, 37, 41)' }}>Registrácia</Link> je jednoduchá a zaberie len pár sekúnd.</p>
          </Col>
          <Col lg="4" md="4" sm="4" xs="12">
            <p style={{ marginBottom: '0.2em', fontWeight: 'bold' }}>Stiahni si mobilnú aplikáciu:</p>
            <a href="https://play.google.com/store/apps/details?id=si.zdielaj" target="_blank" rel="noopener noreferrer">
              <img style={{ width: 135 }} src={GOOGLE_PLAY_LOGO} alt="Google play" className="img-responsive" />
            </a>
            <a href="https://apps.apple.com/sk/app/zdie%C4%BEaj-si-cloud/id1554659147?l=sk" target="_blank" rel="noopener noreferrer">
              <img style={{ width: 135 }} src={APP_STORE_LOGO} alt="App store" className="img-responsive" />
            </a>
          </Col>
        </Row>
      </Container>
    </SEO>
  );
}

export default Home;
