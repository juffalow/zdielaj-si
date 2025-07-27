import { useActionState } from 'react';
import { useTranslation } from 'react-i18next';
import Alert from 'react-bootstrap/Alert';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import UploadedFiles from "../../components/UploadedFiles";
import MobileBottomButton from '../../components/MobileBottomButton';
import useAuth from '../../utils/useAuth';

export default function UserAlbum({ album, updateAlbum }: { album: Album, updateAlbum: any }) {
  const { t } = useTranslation();
  const { user } = useAuth();
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
            <Form.Control type="text" name="name" placeholder="Zadaj nazov albumu" defaultValue={state.name} disabled={user === null} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="albumDescription">
            <Form.Label>{t("album.userAlbum.formDescription")}</Form.Label>
            <Form.Control as="textarea" name="description" rows={3} defaultValue={state.description} disabled={user === null} />
          </Form.Group>

          <Form.Group className="mb-2" controlId="albumLayout">
            <Form.Label>{t("album.userAlbum.formLayout")}</Form.Label>
            <Form.Select name="layout" defaultValue={'cols'} disabled={user === null}>
              <option value="cols">{t("album.userAlbum.formLayoutOptions.cols")}</option>
              <option value="rows">{t("album.userAlbum.formLayoutOptions.rows")}</option>
              <option value="tiles">{t("album.userAlbum.formLayoutOptions.tiles")}</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="albumChangeLayout">
            <Form.Check type="checkbox" name="changeLayout" label={t("album.userAlbum.formChangeLayout")} disabled={user === null} defaultChecked={true}/>
          </Form.Group>

          <Form.Group className="mb-2" controlId="albumGaps">
            <Form.Label>{t("album.userAlbum.formGaps")}</Form.Label>
            <Form.Select name="gaps" defaultValue="small" disabled={user === null}>
              <option value="none">{t("album.userAlbum.formGapsOptions.none")}</option>
              <option value="small">{t("album.userAlbum.formGapsOptions.small")}</option>
              <option value="medium">{t("album.userAlbum.formGapsOptions.medium")}</option>
              <option value="large">{t("album.userAlbum.formGapsOptions.large")}</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="albumRetention">
            <Form.Label>{t("album.userAlbum.formRetention")}</Form.Label>
            <Form.Select name="retention" defaultValue={user === null ? "1" : "0"} disabled={user === null}>
              <option value="1">{t("album.userAlbum.formRetentionOptions.1")}</option>
              <option value="7">{t("album.userAlbum.formRetentionOptions.7")}</option>
              <option value="31">{t("album.userAlbum.formRetentionOptions.31")}</option>
              <option value="366">{t("album.userAlbum.formRetentionOptions.366")}</option>
              <option value="0">{t("album.userAlbum.formRetentionOptions.0")}</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="albumLink">
            <Form.Label>{t("album.userAlbum.formLink")}</Form.Label>
            <Form.Control type="text" name="shortUrl" value={`${window.location.protocol}//${window.location.host}/${album.shortLink?.path}`} readOnly disabled />
          </Form.Group>

          {
            user === null ? (
              <Alert variant="warning">
                {t("album.userAlbum.formAuthWarning")}
              </Alert>
            ) : null
          }

          <Form.Group className="text-center mt-4">
            <Button variant="primary" type="submit" disabled={isPending || user === null} data-tracking-id="album_form_button_save_click" >
              {t("album.userAlbum.formSubmitButton")}
            </Button>

            <Button variant="outline-dark" className="ms-2" onClick={onCopyClick} data-tracking-id="album_form_button_copy_click">
              {t("album.userAlbum.copyButton")}
            </Button>
          </Form.Group>
        </Form>
      </Col>
      <Col lg={8} md={12}>
        <UploadedFiles album={album} canUpload={user !== null} />
      </Col>

      {
        isMobile ? <MobileBottomButton link={`${window.location.protocol}//${window.location.host}/${album.shortLink?.path}`}>{t("album.userAlbum.copyButton")}</MobileBottomButton> : null
      }
    </Row>
  );
}
