import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import styles from './PreviewLoader.module.css';

const Preview: React.FC = () => (
  <Card>
    <div style={{ paddingBottom: '80%', position: 'relative'}} className={styles.loader}></div>
    <Card.Body>
      <Card.Title className={`${styles.loader} mb-2`}>&nbsp;</Card.Title>
      <Card.Subtitle className={`${styles.loader} mb-2`}>&nbsp;</Card.Subtitle>
      <Button className={`${styles.loader} w-100`}>&nbsp;</Button>
      <Button className={`${styles.loader} mt-2 w-100`}>&nbsp;</Button>
    </Card.Body>
  </Card>
);

export default Preview;
