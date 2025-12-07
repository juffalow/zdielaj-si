import { useActionState, useState } from 'react';
import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, Input, Button, Alert } from '@heroui/react';
import useAuth from '../../utils/useAuth';

const ChangePasswordForm: FunctionComponent = () => {
  const { t } = useTranslation('', { keyPrefix: 'profile.changePassword' });
  const { updatePassword } = useAuth();
  const [password, setPassword] = useState('');

  const onSubmit = async (_: unknown, state: FormData): Promise<{ currentPassword: string, newPassword: string, confirmPassword: string, errors: string[] }> => {
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
    <Form action={formAction}>
      {
        state.errors.length > 0 ? (
          <Alert color="danger">
            {state.errors.join(' ')}
          </Alert>
        ) : null
      }

      <Input
        label={t("currentPassword")}
        labelPlacement="outside-top"
        name="currentPassword"
        type="password"
        placeholder={t("currentPasswordPlaceholder")}
        defaultValue={state.currentPassword}
      />

      <Input
        label={t("newPassword")}
        labelPlacement="outside-top"
        name="newPassword"
        type="password"
        autoComplete="new-password"
        defaultValue={state.newPassword}
        minLength={4}
        maxLength={256}
        pattern={"^(?!\\s+)(?!.*\\s+$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$^*.\\[\\]{}()?\"!@#%&/\\\\,><':;|_~`=+\\- ])[A-Za-z0-9$^*.\\[\\]{}()?\"!@#%&/\\\\,><':;|_~`=+\\- ]{8,256}$"}
        placeholder={t("newPasswordPlaceholder")}
        onChange={(e) => setPassword(e.target.value)}
        description={<ul className="list-disc list-inside">
          <li>{t("passwordRules.minEightCharacters")} { password.length >= 8 ? <span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span> : null }</li>
          <li>{t("passwordRules.atLeastOneUppercase")} { password.toLowerCase() !== password ? <span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span> : null }</li>
          <li>{t("passwordRules.atLeastOneLowercase")} { password.toUpperCase() !== password ? <span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span> : null }</li>
          <li>{t("passwordRules.atLeastOneSpecialCharacter")} { password.match(/[^$*.\[\]{}()?"!@#%&/\,><':;|_~`=+-]/) ? <span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span> : null }</li>
          <li>{t("passwordRules.atLeastOneNumber")} { password.match(/\d/) ? <span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span> : null }</li>
        </ul>}
      />
      
      <Input
        label={t("confirmPassword")}
        labelPlacement="outside-top"
        name="confirmPassword"
        type="password"
        autoComplete="new-password"
        placeholder=""
        defaultValue={state.confirmPassword}
      />

      <Button type="submit" isLoading={isPending} color="primary">
        {t("button")}
      </Button>
    </Form>
  );
};

export default ChangePasswordForm;
