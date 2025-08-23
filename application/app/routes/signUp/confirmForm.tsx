import { useActionState } from 'react';
import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Form,
  InputOtp,
  Button,
  Alert,
} from '@heroui/react';
import logger from '../../logger';

interface Props {
  onConfirmSubmit: (code: string) => Promise<void>;
}

const ConfirmForm: FunctionComponent<Props> = ({ onConfirmSubmit }: Props) => {
  const { t } = useTranslation('', { keyPrefix: 'signUp.confirmForm' });

  const onSubmit = async (_: unknown, state: FormData): Promise<{ code: string, error: string | null }> => {
    const code = state.get('code') as string;
    let error = null;

    try {
      await onConfirmSubmit(code);
    } catch (err) {
      logger.error('Unable to confirm sign up!', { error: err });

      if (typeof err === 'object' && err !== null && 'name' in err && err.name === 'CodeMismatchException') {
        error = t('errors.codeMismatch');
      } else {
        error = t('errors.default');
      }
    }

    return { code, error };
  };

  const [state, formAction, isPending] = useActionState(onSubmit, { code: '', error: null });

  return (
    <Form action={formAction} className="space-y-6">
      {
        state.error !== null ? (
          <Alert color="danger" description={state.error} hideIcon={true} />
        ) : null
      }

      <InputOtp
        isRequired
        errorMessage={t('requiredField')}
        label={t('code')}
        name="code"
        length={6}
      />

      <Button type="submit" color="primary" fullWidth={true} isDisabled={isPending}>
        {t('confirmSignUpButton')}
      </Button>
    </Form>
  );
};

export default ConfirmForm;
