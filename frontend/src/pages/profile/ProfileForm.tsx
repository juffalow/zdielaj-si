import { use } from 'react';
import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';

interface Props {
  getCurrentUserPromise: Promise<User>;
}

const ProfileForm: FunctionComponent<Props> = ({ getCurrentUserPromise }: Props) => {
  const { t } = useTranslation('', { keyPrefix: 'profile.detail' });
  const user = use(getCurrentUserPromise);
  
  return (
    <Form noValidate>
      <Form.Group>
        <Form.Label>{t('email')}</Form.Label>
        <Form.Control type="email" name="email" value={user.email} readOnly disabled />
      </Form.Group>
    </Form>
  );
};

export default ProfileForm;
