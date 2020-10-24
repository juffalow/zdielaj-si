import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Thumbnail from './album/Thumbnail';
import SEO from '../components/SEO';
import config from '../config';

const Album: React.FC = (props: any) => {
  const [ files, setFiles ] = useState([] as Array<any>);

  useEffect(() => {
    fetch(`${config.url}/album/${props.match.params.id}`)
      .then(res => res.json())
      .then((json) => setFiles(json.data.photos));
  }, []);

  return (
    <SEO title="" description="">
      <Container>
        {
          files.length > 0 ? (
            <Row style={{ marginTop: 20 }} lg={6} md={6} sm={4} xs={2}>
              {
                files.map((file) => (
                  <Col key={file.id}>
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
