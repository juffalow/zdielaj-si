import { createPortal } from 'react-dom';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

interface Props {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => unknown;
}

const MobileButton: React.FC<Props> = ({ children, onClick }: Props) => (
  <>
    {
      createPortal(
      <div className="relative" style={{ height: 68 }}>
        <div style={{ position: 'fixed', bottom: 0, width: '100%', backgroundColor: 'var(--bs-body-bg)' }}>
          <hr className="border border-3 opacity-100 mt-0 mb-0" />
          <Col className="d-flex justify-content-center pt-2 pb-2" xs={{  span: 10, offset: 1 }} sm={{ span: 8, offset: 2  }}>
            <Button onClick={onClick} className="w-100" size="lg">{children}</Button>
          </Col>
        </div>
      </div>
      , document.body)
    }
  </>
);

export default MobileButton;
