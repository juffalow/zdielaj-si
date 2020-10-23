import React, { useState, useEffect, useCallback } from 'react';
import Container from 'react-bootstrap/Container';
import { useDropzone } from 'react-dropzone';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Thumbnails from './home/Thumbnails';
import FeaturesList from './home/FeaturesList';
import SEO from '../components/SEO';
import config from '../config';

const Home: React.FC = () => {
  const [ files, setFiles ] = useState([]);
  const [ albumId, setAlbumId ] = useState('');

  const onDrop = useCallback(files => {
    setFiles(files.map((file: any) => {
      return { ...file, preview: URL.createObjectURL(file) };
    }));

    const formData = new FormData();

    files.forEach((file: any) => {
      formData.append(`images`, file);
    });

    fetch(`${config.url}/upload`, {
      method: 'POST',
      body: formData,
    })
    .then(res => res.json())
    .then(res => {
      setAlbumId(res.data.album.id);
    });
  }, []);

  const {
    getRootProps,
    getInputProps,
    open,
    isDragActive,
  } = useDropzone({ onDrop, accept: 'image/*', maxFiles: 10 });

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const onCopyClick = () => {
    const el = document.createElement('textarea');
    el.value = `${window.location.protocol}//${window.location.host}/album/${albumId}`;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  }

  return (
    <SEO title="" description="">
      <Container>
        <Row>
          <Col>
            <h1>Zdielaj si fotky v plnej kvalite</h1>
            <p className="lead">Tiež máš problém, že ti Messanger zníži kvalitu fotiek? Tu ich môžeš zdielať bez problémov v plnej kvalite!</p>
            <div {...getRootProps()} style={{ border: '1px #28a745 dashed', padding: '40px', borderRadius: '20px', textAlign: 'center', marginTop: 50 }}>
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <p>Drop the files here ...</p> :
                  <p style={{ marginBottom: 0 }}>Drag 'n' drop some files here, or click to select files</p>
              }
              <div style={{ marginTop: 20 }}>
                <Button variant="success" onClick={open}>Nahrať fotky</Button>
              </div>
            </div>
          </Col>
        </Row>
        {
          files.length > 0 ? (
            <>
              <Row style={{ marginTop: 50 }}>
                <Col>
                  <h2>Tvoje fotky</h2>
                  <InputGroup>
                    <FormControl type="text" value={`${window.location.protocol}//${window.location.host}/album/${albumId}`} readOnly />
                    <InputGroup.Append>
                      <Button variant="outline-secondary" onClick={onCopyClick}>Kopírovať</Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Col>
              </Row>
              <Row style={{ marginTop: 30 }}>
                <Thumbnails files={files} />
              </Row>
            </>
          ) : null
        }
        <Row style={{ marginTop: 50 }}>
          <Col>
            <p style={{ marginBottom: '0.2em' }}>Zadarmo ako neprihlásený užívateľ:</p>
            <FeaturesList>
              <li>môžeš zdielať maximálne 10 fotiek naraz</li>
              <li>fotky budú po 24h automaticky zmazané</li>
            </FeaturesList>
          </Col>
          <Col>
            <p style={{ marginBottom: '0.2em' }}>Zadarmo ako prihlásený užívateľ:</p>
            <FeaturesList>
              <li>môžeš zdielať maximálne 50 fotiek naraz</li>
              <li>fotky budú po 24h automaticky zmazané</li>
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
