"use client"

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'next/navigation';
import Thumbnail from './Thumbnail';
import ShareableLink from '../../..//components/ShareableLink';
import useUpload from '../../../../utils/useUpload';

export default function Loader() {
  const params = useParams();
  const { files } = useUpload();

  if (files.length === 0) {
    return null;
  }

  return (
    <>
      <Row>
        <Col>
          <h1 style={{ display: 'inline-block' }}>Tvoje fotky</h1>
          <p>Svoje fotky môžeš teraz zdieľať pomocou nižšie uvedenej url adresy, alebo doplniť ďaľšie fotky kliknutím na tlačítko plus (+).</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <ShareableLink albumId={params.id as string} />
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
      </Row>
    </>
  );
}
