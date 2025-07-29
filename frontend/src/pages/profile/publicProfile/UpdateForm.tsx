import { useActionState } from 'react';
import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {
  FaHome,
  FaFacebook,
  FaInstagram,
  FaStrava,
  FaPinterest,
} from 'react-icons/fa';

interface Props {
  publicProfile: PublicProfile;
  onSubmit: (prevState: unknown, values: FormData) => any
}

const UpdateForm: FunctionComponent<Props> = ({ publicProfile, onSubmit }: Props) => {
  const { t } = useTranslation();
  const [state, formAction, isPending] = useActionState(onSubmit, {
    name: publicProfile.name,
    description: publicProfile.description,
    contact: {
      homepage: publicProfile?.contact?.homepage,
      facebook: publicProfile?.contact?.facebook,
      instagram: publicProfile?.contact?.instagram,
      pinterest: publicProfile?.contact?.pinterest,
      strava: publicProfile?.contact?.strava,
    }
  });

  return (
    <Form noValidate action={formAction}>
      {
        state.error ? (
          <Alert variant="danger">
            {state.error.message}
          </Alert>
        ) : null  
      }
      <Form.Group controlId="publicProfileName">
        <Form.Label>{t("profile.publicProfile.updateForm.fieldName")}</Form.Label>
        <Form.Control type="text" name="name" placeholder="" defaultValue={state.name} />
        <Form.Control.Feedback type="invalid">{t("profile.publicProfile.updateForm.mandatoryField")}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="publicProfileDescription" className="mt-3">
        <Form.Label>{t("profile.publicProfile.updateForm.fieldDescription")}</Form.Label>
        <Form.Control as="textarea" name="description" rows={3} defaultValue={state.description} />
        <Form.Control.Feedback type="invalid">{t("profile.publicProfile.updateForm.mandatoryField")}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group controlId="contactHomepage" className="mt-3">
        <Form.Label><FaHome /> {t("profile.publicProfile.updateForm.fieldHomepage")}</Form.Label>
        <Form.Control type="text" name="contact[homepage]" placeholder="https://zdielaj.si" defaultValue={state.contact.homepage} />
      </Form.Group>

      <Form.Group controlId="contactFacebook" className="mt-3">
        <Form.Label><FaFacebook /> {t("profile.publicProfile.updateForm.fieldFacebook")}</Form.Label>
        <Form.Control type="text" name="contact[facebook]" placeholder="https://www.facebook.com/zdielaj.si" defaultValue={state.contact.facebook} />
      </Form.Group>

      <Form.Group controlId="contactInstagram" className="mt-3">
        <Form.Label><FaInstagram /> {t("profile.publicProfile.updateForm.fieldInstagram")}</Form.Label>
        <Form.Control type="text" name="contact[instagram]" placeholder="https://www.instagram.com/zdielaj.si" defaultValue={state.contact.instagram} />
      </Form.Group>

      <Form.Group controlId="contactPinterest" className="mt-3">
        <Form.Label><FaPinterest /> {t("profile.publicProfile.updateForm.fieldPinterest")}</Form.Label>
        <Form.Control type="text" name="contact[pinterest]" placeholder="https://www.pinterest.com/zdielaj.si" defaultValue={state.contact.pinterest} />
      </Form.Group>

      <Form.Group controlId="contactStrava" className="mt-3">
        <Form.Label><FaStrava /> {t("profile.publicProfile.updateForm.fieldStrava")}</Form.Label>
        <Form.Control type="text" name="contact[strava]" placeholder="https://www.strava.com/clubs/1135445" defaultValue={state.contact.strava} />
      </Form.Group>

      <Form.Group className="text-center mt-4">
        <Button variant="primary" type="submit" disabled={isPending}>
          {t("profile.publicProfile.updateForm.submitButton")}
        </Button>
      </Form.Group>
    </Form>
  );
};

export default UpdateForm;
