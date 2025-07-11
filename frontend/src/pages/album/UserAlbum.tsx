import { useActionState } from 'react';
import { useTranslation } from 'react-i18next';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import UploadedFiles from "../../components/UploadedFiles";
import MobileBottomButton from '../../components/MobileBottomButton';

export default function UserAlbum({ album, updateAlbum }: { album: Album, updateAlbum: any }) {
  const { t } = useTranslation();
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobile = /iphone|ipad|ipod|android|windows phone/g.test(userAgent);
  const [state, formAction, isPending] = useActionState(updateAlbum, { name: album.name, description: album.description });

  const onCopyClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    navigator.clipboard.writeText(`${window.location.protocol}//${window.location.host}/${album.shortLink?.path}`);

    (event.target as HTMLButtonElement).innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&#10003;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';

    setTimeout(() => {
      (event.target as HTMLButtonElement).innerHTML = t("album.userAlbum.copyButton");
    }, 2000);
  };

  return (
    <Row>
      <title>{state.name}</title>
      <Col lg={4} md={12}>
        <Form action={formAction}>
          <Form.Group className="mb-3" controlId="albumName">
            <Form.Label>{t("album.userAlbum.formName")}</Form.Label>
            <Form.Control type="text" name="name" placeholder="Zadaj nazov albumu" defaultValue={state.name} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="albumDescription">
            <Form.Label>{t("album.userAlbum.formDescription")}</Form.Label>
            <Form.Control as="textarea" name="description" rows={3} defaultValue={state.description} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="albumDescription">
            <Form.Label>{t("album.userAlbum.formLink")}</Form.Label>
            <Form.Control type="text" name="shortUrl" value={`${window.location.protocol}//${window.location.host}/${album.shortLink?.path}`} readOnly disabled />
          </Form.Group>

          <Form.Group className="text-center mt-4">
            <Button variant="primary" type="submit" disabled={isPending} data-tracking-id="album_form_button_save_click">
              {t("album.userAlbum.formSubmitButton")}
            </Button>

            <Button variant="outline-secondary" className="ms-2" onClick={onCopyClick} data-tracking-id="album_form_button_copy_click">
              {t("album.userAlbum.copyButton")}
            </Button>
          </Form.Group>
        </Form>
      </Col>
      <Col lg={8} md={12}>
        <UploadedFiles album={album} />
      </Col>

      {
        isMobile ? <MobileBottomButton link={`${window.location.protocol}//${window.location.host}/${album.shortLink?.path}`}>{t("album.userAlbum.copyButton")}</MobileBottomButton> : null
      }
    </Row>
  );
}
