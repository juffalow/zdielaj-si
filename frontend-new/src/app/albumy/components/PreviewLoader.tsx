import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styles from './PreviewLoader.module.css';

const Preview: React.FC = () => (
  <Card>
    <Card.Body>
      <div style={{ paddingBottom: '80%', position: 'relative'}} className={`${styles.loader} mb-2`}></div>
      <Card.Title className={`${styles.loader} mb-2`}>&nbsp;</Card.Title>
      <Card.Subtitle className={`${styles.loader} mb-2`}>&nbsp;</Card.Subtitle>
      <Button className={styles.loader} style={{ border: 'none' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Button>
    </Card.Body>
  </Card>
);

export default Preview;
