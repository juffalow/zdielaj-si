import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import Thumbnail from './album/Thumbnail';
import SEO from '../components/SEO';
import config from '../config';

const Album: React.FC = (props: any) => {
  const [ files, setFiles ] = useState([] as Array<any>);
  const [ hasError, setHasError ] = useState(false);

  useEffect(() => {
    fetch(`${config.url}/album/${props.match.params.id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error();
        }
        return response;
      })
      .then(res => res.json())
      .then((json) => setFiles(json.data.photos))
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
            <Row style={{ marginTop: 20 }} className="justify-content-lg-center justify-content-md-center justify-content-sm-center">
              {
                files.map((file) => (
                  <Col
                    key={file.id}
                    lg={files.length >= 6 ? 2 : Math.floor(12 / files.length)}
                    md={files.length >= 6 ? 2 : Math.floor(12 / files.length)}
                    sm={files.length >= 3 ? 3 : Math.floor(6 / files.length)}
                    xs={files.length === 1 ? true : 6}
                  >
                    <Thumbnail photo={file} />
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

export default Album;
