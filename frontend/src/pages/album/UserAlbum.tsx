import { useActionState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import UploadedFiles from "../../components/UploadedFiles";
import ShareableLink from '../home/ShareableLink';
import MobileBottomButton from '../../components/MobileBottomButton';

export default function UserAlbum({ album, updateAlbum }: { album: Album, updateAlbum: any }) {
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /iphone|ipad|ipod|android|windows phone/g.test(userAgent);
  const [state, formAction, isPending] = useActionState(updateAlbum, { name: album.name, description: album.description });

  const onCopyClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(`${window.location.protocol}//${window.location.host}/${album.shortLink?.path}`);

    (event.target as HTMLButtonElement).innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#10003;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';

    setTimeout(() => {
      (event.target as HTMLButtonElement).innerHTML = 'Kopírovať';
    }, 2000);
  };

  return (
    <Row>
      <title>{state.name}</title>
      <Col lg={4} md={6}>
        <Form action={formAction}>
          <Form.Group className="mb-3" controlId="albumName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" placeholder="Zadaj nazov albumu" defaultValue={state.name} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="albumDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" name="description" rows={3} defaultValue={state.description} />
          </Form.Group>

          <Form.Group className="text-center mt-4">
            <Button variant="primary" type="submit" disabled={isPending}>
              Uložiť
            </Button>
          </Form.Group>
        </Form>

        <hr className="mt-5 mb-3" />
        <ShareableLink url={`${window.location.protocol}//${window.location.host}/${album.shortLink?.path}`} onClick={onCopyClick} />
      </Col>
      <Col lg={8} md={6}>
        <UploadedFiles album={album} />
      </Col>

      {
        isMobile ? <MobileBottomButton onClick={onCopyClick}>Kopírovať</MobileBottomButton> : null
      }
    </Row>
  );
}
