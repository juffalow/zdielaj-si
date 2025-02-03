import { createPortal } from 'react-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

interface Props {
  children: React.ReactNode;
  link: string;
}

const MobileButton: React.FC<Props> = ({ children, link }: Props) => {
  const onCopyClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(link);

    const innerHTML = (event.target as HTMLButtonElement).innerHTML;
    (event.target as HTMLButtonElement).innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#10003;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';

    setTimeout(() => {
      (event.target as HTMLButtonElement).innerHTML = innerHTML;
    }, 2000);
  };

  return createPortal(
    <div className="relative">
      <div style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: 'rgba(153, 153, 153, 0.6)' }}>
        <Col className="d-flex justify-content-center pt-4 pb-4" xs={{  span: 10, offset: 1 }} sm={{ span: 8, offset: 2  }}>
          <Button onClick={onCopyClick} className="w-100" size="lg">{children}</Button>
        </Col>
      </div>
    </div>
  , document.body);
}

export default MobileButton;
