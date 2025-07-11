import { useState, useActionState } from 'react';
import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import slugify from '@sindresorhus/slugify';

interface Props {
  onSubmit: (values: any) => object;
}

const CreateForm: FunctionComponent<Props> = ({ onSubmit }: Props) => {
  const { t } = useTranslation();
  const [ slug, setSlug ] = useState<string>('');
  const [state, formAction, isPending] = useActionState(onSubmit, { /* name: '', slug: '', description: ''  */ });

  const onChange = (event: any) => {
    if (event.target.name === 'name' || event.target.name === 'slug') {
      const value = event.target.value;
      setSlug(slugify(value, { lowercase: true, separator: '-' }));
    }
  }

  return (
    <Form noValidate onChange={onChange} action={formAction}>
      <Form.Group controlId="publicProfileName">
        <Form.Label>{t("profile.publicProfile.createForm.fieldName")}</Form.Label>
        <Form.Control type="text" name="name" placeholder="" />
        <Form.Control.Feedback type="invalid">{t("profile.publicProfile.createForm.mandatoryField")}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="publicProfileId" className="mt-3">
        <Form.Label>{t("profile.publicProfile.createForm.fieldSlug")}</Form.Label>
        <Form.Control required type="text" name="slug" placeholder="" value={slug} />
        <Form.Control.Feedback type="invalid">{t("profile.publicProfile.createForm.mandatoryField")}</Form.Control.Feedback>
        <Form.Text id="passwordHelpBlock" muted>
          {t("profile.publicProfile.createForm.fieldSlugHelp1")} <br />
          {t("profile.publicProfile.createForm.fieldSlugHelp2")} <a href={`https://zdielaj.si/${t("routes.prefix")}${t("routes.publicProfile").replace(':id', slug)}`}>https://zdielaj.si/{t("routes.prefix")}{t("routes.publicProfile").replace(':id', slug)}</a>
        </Form.Text>
      </Form.Group>
      <Form.Group controlId="publicProfileDescription" className="mt-3">
        <Form.Label>{t("profile.publicProfile.createForm.fieldDescription")}</Form.Label>
        <Form.Control as="textarea" name="description" rows={3} />
        <Form.Control.Feedback type="invalid">{t("profile.publicProfile.createForm.mandatoryField")}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="text-center mt-4">
        <Button variant="primary" type="submit">
          {t("profile.publicProfile.createForm.createButton")}
        </Button>

        <Button variant="secondary" className="ms-2">
          {t("profile.publicProfile.createForm.cancelButton")}
        </Button>
      </Form.Group>
    </Form>
  );
};

export default CreateForm;
