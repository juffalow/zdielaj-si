import { useActionState, useState } from 'react';
import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { Form, TextField, Label, Input, Description, Button, Alert, Spinner } from '@heroui/react';
import useAuth from '../../utils/useAuth';

const ChangePasswordForm: FunctionComponent = () => {
  const { t } = useTranslation('', { keyPrefix: 'profile.changePassword' });
  const { updatePassword } = useAuth();
  const [password, setPassword] = useState('');

  const onSubmit = async (
    _: unknown,
    state: FormData
  ): Promise<{ currentPassword: string; newPassword: string; confirmPassword: string; errors: string[] }> => {
    const currentPassword = state.get('currentPassword') as string;
    const newPassword = state.get('newPassword') as string;
    const confirmPassword = state.get('confirmPassword') as string;

    try {
      await updatePassword(currentPassword, newPassword);
    } catch (error: unknown) {
      console.error('Error updating password:', error);
      return { currentPassword, newPassword, confirmPassword, errors: [(error as Error).message] };
    }

    return { currentPassword: '', newPassword: '', confirmPassword: '', errors: [] };
  };

  const [state, formAction, isPending] = useActionState(onSubmit, {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    errors: [],
  });

  return (
    <Form action={formAction} className="space-y-6">
      {state.errors.length > 0 ? (
        <Alert status="danger">
          <Alert.Content>
            <Alert.Description>{state.errors.join(' ')}</Alert.Description>
          </Alert.Content>
        </Alert>
      ) : null}

      <TextField name="currentPassword" type="password" defaultValue={state.currentPassword}>
        <Label>{t('currentPassword')}</Label>
        <Input placeholder={t('currentPasswordPlaceholder')} />
      </TextField>

      <TextField name="newPassword" type="password" defaultValue={state.newPassword}>
        <Label>{t('newPassword')}</Label>
        <Input
          autoComplete="new-password"
          placeholder={t('newPasswordPlaceholder')}
          minLength={4}
          maxLength={256}
          pattern={
            '^(?!\\s+)(?!.*\\s+$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$^*.\\[\\]{}()?"!@#%&/\\\\,><\':;|_~`=+\\- ])[A-Za-z0-9$^*.\\[\\]{}()?"!@#%&/\\\\,><\':;|_~`=+\\- ]{8,256}$'
          }
          onChange={(e) => setPassword(e.target.value)}
        />
        <Description>
          <ul className="list-disc list-inside">
            <li>
              {t('passwordRules.minEightCharacters')}{' '}
              {password.length >= 8 ? <span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span> : null}
            </li>
            <li>
              {t('passwordRules.atLeastOneUppercase')}{' '}
              {password.toLowerCase() !== password ? (
                <span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>
              ) : null}
            </li>
            <li>
              {t('passwordRules.atLeastOneLowercase')}{' '}
              {password.toUpperCase() !== password ? (
                <span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>
              ) : null}
            </li>
            <li>
              {t('passwordRules.atLeastOneSpecialCharacter')}{' '}
              {password.match(/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/) ? (
                <span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span>
              ) : null}
            </li>
            <li>
              {t('passwordRules.atLeastOneNumber')}{' '}
              {password.match(/\d/) ? <span style={{ color: 'green', fontWeight: 'bold' }}>&#10003;</span> : null}
            </li>
          </ul>
        </Description>
      </TextField>

      <TextField name="confirmPassword" type="password" defaultValue={state.confirmPassword}>
        <Label>{t('confirmPassword')}</Label>
        <Input autoComplete="new-password" placeholder="" />
      </TextField>

      <Button type="submit" variant="primary" isPending={isPending}>
        {({ isPending }) => (
          <>
            {isPending && <Spinner color="current" size="sm" />}
            {t('button')}
          </>
        )}
      </Button>
    </Form>
  );
};

export default ChangePasswordForm;
