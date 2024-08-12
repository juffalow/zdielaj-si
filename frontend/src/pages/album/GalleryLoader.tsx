import { useLayoutEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BlockLoader from '../../components/BlockLoader';

export default function GalleryLoader() {  
  const innerWidth = window.innerWidth;
  const [cols, setCols] = useState(innerWidth < 768 ? 1 : innerWidth < 992 ? 2 : innerWidth < 1200 ? 3 : innerWidth < 1600 ? 4 : 5);

  useLayoutEffect(() => {
    function updateSize() {
      const innerWidth = window.innerWidth;
      setCols(innerWidth < 768 ? 1 : innerWidth < 992 ? 2 : innerWidth < 1200 ? 3 : innerWidth < 1600 ? 4 : 5);
    }
    window.addEventListener('resize', updateSize);

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <Row>
      {
        Array(cols).fill(undefined).map((_, index) => (
          <Col key={index}>
            <BlockLoader style={{ opacity: 1 - ((index * 3) / 10) }} />
          </Col>
        ))
      }
    </Row>
  );
}
