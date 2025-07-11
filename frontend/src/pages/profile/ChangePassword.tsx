import { useActionState } from 'react';
import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import useAuth from '../../utils/useAuth';

const ChangePasswordForm: FunctionComponent = () => {
  const { t } = useTranslation('', { keyPrefix: 'profile.changePasswordForm' });
  const { updatePassword } = useAuth();

  const onSubmit = async (prevState: unknown, state: FormData): Promise<{ currentPassword: string, newPassword: string, confirmPassword: string, errors: string[] }> => {
    const currentPassword = state.get('currentPassword') as string;
    const newPassword = state.get('newPassword') as string;
    const confirmPassword = state.get('confirmPassword') as string;

    try {
      await updatePassword(currentPassword, newPassword)
    } catch (error: unknown) {
      console.error('Error updating password:', error);
      return { currentPassword, newPassword, confirmPassword, errors: [ (error as Error).message ] };
    }

    return { currentPassword: '', newPassword: '', confirmPassword: '', errors: [] };
  }

  const [state, formAction, isPending] = useActionState(onSubmit, { currentPassword: '', newPassword: '', confirmPassword: '', errors: [] });
  
  return (
    <Form action={formAction} noValidate>
      {
        state.errors.length > 0 ? (
          <Alert variant={'danger'}>
            {state.errors.join(' ')}
          </Alert>
        ) : null
      }

      <Form.Group controlId="currentPassword" className="mb-3">
        <Form.Label>{t("currentPassword")}</Form.Label>
        <Form.Control required type="password" name="currentPassword" placeholder={t("currentPasswordPlaceholder")} defaultValue={state.currentPassword} />
      </Form.Group>

      <Form.Group controlId="newPassword" className="mb-3">
        <Form.Label>{t("newPassword")}</Form.Label>
        <Form.Control required type="password" name="newPassword" placeholder={t("newPasswordPlaceholder")} defaultValue={state.newPassword} />
      </Form.Group>
      
      <Form.Group controlId="confirmPassword" className="mb-3">
        <Form.Label>{t("confirmPassword")}</Form.Label>
        <Form.Control required type="password" name="confirmPassword" placeholder="" defaultValue={state.confirmPassword} />
      </Form.Group>

      <Form.Group className="text-center">
        <Button variant="primary" type="submit" disabled={isPending}>
          {t("button")}
        </Button>
      </Form.Group>
    </Form>
  );
};

export default ChangePasswordForm;
