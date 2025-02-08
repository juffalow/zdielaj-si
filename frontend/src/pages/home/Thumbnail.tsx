import type { FunctionComponent } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './Thumbnail.css';

interface ThumbnailParameters {
  file: UploadedFile;
  isUploading?: boolean;
}

const Thumbnail: FunctionComponent<ThumbnailParameters> = ({ file, isUploading }: ThumbnailParameters) => (
  <div className="thumbnail-container">
    <img src={file.preview} className="thumbnail-image" alt="" />
    {
      isUploading === true && (
        <div className="thumbnail-shadow">
          <div className="spinner-container">
            <Spinner animation="border" variant="secondary" />
          </div>
        </div>
      )
    }
  </div>
)

export default Thumbnail;
