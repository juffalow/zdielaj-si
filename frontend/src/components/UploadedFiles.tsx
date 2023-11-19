import React from 'react';
import { useDropzone } from 'react-dropzone';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { addMedia } from '../api/services';
import AddPhotoCard from '../pages/home/AddPhotoCard';
import ShareableLink from '../pages/home/ShareableLink';
import Thumbnail from '../pages/home/Thumbnail';
import useUpload from '../utils/useUpload';

const UploadedFiles: React.FC<{album: Album}> = ({ album }) => {
  const {
    files,
    onDrop,
  } = useUpload();

  const onSingleDrop = async (acceptedFiles: File[]) => {
    onDrop(acceptedFiles, async (media) => {
      await addMedia(album.id, media.id);
    });  
  };

  const {
    getRootProps: getSingleRootProps,
    getInputProps: getSingleInputProps,
  } = useDropzone({ onDrop: onSingleDrop, accept: 'image/*, video/*', maxFiles: 50 });

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
  );
}

export default UploadedFiles;
