import { useDropzone } from 'react-dropzone';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { addMedia } from '../api/services';
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
        <Col className="ps-5 pe-5 pb-4 mt-4">
          <div {...getSingleRootProps()} style={{ border: '1px #28a745 dashed', borderRadius: '20px', textAlign: 'center', padding: 40 }}>
            <input {...getSingleInputProps()} />
            <p>Presuň sem fotky alebo ich vyber kliknutím</p>
          </div>
        </Col>
      </Row>
      <Row>
        {
          files.map((file: UploadedFile, index: number) => (
            <Col lg={3} md={6} sm={6} xs={files.length === 1 ? true : 6} key={`${index}-${file.path}`} className="mb-2">
              <Thumbnail file={file} isUploading={file.isUploading} />
            </Col>
          ))
        }
      </Row>
    </>
  );
}

export default UploadedFiles;
