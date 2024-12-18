import React from 'react';
import { useDropzone } from 'react-dropzone';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { addMedia } from '../api/services';
import MobileBottomButton from '../components/MobileBottomButton';
import AddPhotoCard from '../pages/home/AddPhotoCard';
import ShareableLink from '../pages/home/ShareableLink';
import Thumbnail from '../pages/home/Thumbnail';
import useUpload from '../utils/useUpload';

const UploadedFiles: React.FC<{album: Album}> = ({ album }) => {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /iphone|ipad|ipod|android|windows phone/g.test(userAgent);

  const {
    files,
    uploadSpeed,
    onDrop,
  } = useUpload();

  const onSingleDrop = async (acceptedFiles: File[]) => {
    onDrop(acceptedFiles, async (media) => {
      await addMedia(album.id, media.id);
    });  
  };

  const onCopyClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(`${window.location.protocol}//${window.location.host}/album/${'compressedId' in album ? album.compressedId as string : album.id}`);

    (event.target as HTMLButtonElement).innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#10003;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';

    setTimeout(() => {
      (event.target as HTMLButtonElement).innerHTML = 'Kopírovať';
    }, 2000);
  };

  const {
    getRootProps: getSingleRootProps,
    getInputProps: getSingleInputProps,
  } = useDropzone({ onDrop: onSingleDrop, accept: 'image/*, video/*', maxFiles: 50 });

  const uploadingCount = files.filter(file => file.isUploading === false).length;
  const uploadingSizeSum = files.filter(file => file.isUploading).reduce((sum, file) => sum + file.size, 0);

  return (
    <>
      <Row>
        <Col>
          <h1 className="text-center">Tvoje fotky</h1>
          <p className="text-center">Svoje fotky môžeš teraz zdieľať pomocou nižšie uvedenej url adresy, alebo doplniť ďaľšie fotky kliknutím na tlačítko plus (+).</p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col lg={{ span: 6, offset: 3 }} sm={{ span: 8, offset: 2 }}>
          <ShareableLink url={`${window.location.protocol}//${window.location.host}/album/${'compressedId' in album ? album.compressedId as string : album.id}`} onClick={onCopyClick} />
          <p className="ps-2 pe-2 mt-1">
            {
              uploadSpeed > 0 ? `Odahovaný čas: ${Math.ceil(uploadingSizeSum / uploadSpeed)} sekúnd` : 'Prepočitavanie odhadovaného času...'
            }
            <span className="float-end">{uploadingCount}/{files.length}</span>
          </p>
        </Col>
      </Row>
      <Row className="mt-4">
        {
          files.map((file: UploadedFile, index: number) => (
            <Col lg={2} md={2} sm={3} xs={files.length === 1 ? true : 6} key={`${index}-${file.path}`} className="mb-2">
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
      {
        isMobile ? <MobileBottomButton onClick={onCopyClick}>Kopírovať</MobileBottomButton> : null
      }
    </>
  );
}

export default UploadedFiles;
