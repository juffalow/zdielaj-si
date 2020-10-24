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
            <Row style={{ marginTop: 20 }}>
              {
                files.map((file) => (
                  <Col key={file.id} lg={files.length >= 6 ? 2 : true} md={files.length >= 6 ? 2 : true} sm={files.length >= 3 ? 3 : true} xs={files.length === 1 ? true : 6}>
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
