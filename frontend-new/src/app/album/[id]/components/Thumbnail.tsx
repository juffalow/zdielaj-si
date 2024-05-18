import Spinner from 'react-bootstrap/Spinner';
import styles from './Thumbnail.module.css';

interface ThumbnailParameters {
  file: any;
  isUploading?: boolean;
}

const Thumbnail: React.FC<ThumbnailParameters> = ({ file, isUploading }: ThumbnailParameters) => (
  <div className={styles.thumbnailContainer}>
    <img src={file.preview} className={styles.thumbnailImage} alt="" />
    {
      isUploading === true && (
        <div className={styles.thumbnailShadow}>
          <div className={styles.spinnerContainer}>
            <Spinner animation="border" variant="secondary" />
          </div>
        </div>
      )
    }
  </div>
)

export default Thumbnail;
