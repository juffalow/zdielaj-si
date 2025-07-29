import { useLayoutEffect, useState } from 'react'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import BlockLoader from '../../components/BlockLoader';

export default function GalleryLoader() {  
  const screenWidth = window.innerWidth;
  const [ cols, setCols ] = useState(screenWidth >= 1200 ? 6 :
    screenWidth >= 992 ? 4 :
    screenWidth >= 768 ? 3 : 2);

  useLayoutEffect(() => {
    function updateSize() {
      const screenWidth = window.innerWidth;
      setCols(screenWidth >= 1200 ? 6 :
        screenWidth >= 992 ? 4 :
        screenWidth >= 768 ? 3 : 2);
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
