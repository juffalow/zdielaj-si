import { useState, useActionState } from 'react';
import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Form, TextField, Label, Input, TextArea, FieldError, Spinner } from '@heroui/react';
import slugify from '@sindresorhus/slugify';

interface Props {
  onSubmit: (values: any) => Promise<{ name: string; slug: string; description: string; error?: string | null }>;
}

const CreateForm: FunctionComponent<Props> = ({ onSubmit }: Props) => {
  const { t } = useTranslation();
  const [slug, setSlug] = useState<string>('');
  const [state, formAction, isPending] = useActionState(onSubmit, { name: '', slug: '', description: '', error: null });

  const onChange = (event: any) => {
    if (event.target.name === 'name' || event.target.name === 'slug') {
      const value = event.target.value;
      setSlug(slugify(value, { lowercase: true, separator: '-' }));
    }
  };

  return (
    <Form action={formAction}>
      <TextField isRequired name="name" type="text" defaultValue={state.name}>
        <Label>{t('profile.publicProfile.createForm.fieldName')}</Label>
        <Input onChange={onChange} />
        <FieldError>{t('profile.publicProfile.createForm.mandatoryField')}</FieldError>
      </TextField>

      <TextField isRequired name="slug" type="text">
        <Label>{t('profile.publicProfile.createForm.fieldSlug')}</Label>
        <Input value={slug} placeholder="" />
        <FieldError>{t('profile.publicProfile.createForm.mandatoryField')}</FieldError>
      </TextField>

      <p>
        {t('profile.publicProfile.createForm.fieldSlugHelp1')} <br />
        {t('profile.publicProfile.createForm.fieldSlugHelp2')}{' '}
        <a href={`https://zdielaj.si/${t('routes.prefix')}${t('routes.publicProfile').replace(':id', slug)}`}>
          https://zdielaj.si/{t('routes.prefix')}
          {t('routes.publicProfile').replace(':id', slug)}
        </a>
      </p>

      <TextField name="description">
        <Label>{t('profile.publicProfile.createForm.fieldDescription')}</Label>
        <TextArea />
        <FieldError>{t('profile.publicProfile.createForm.mandatoryField')}</FieldError>
      </TextField>

      <Button type="submit" variant="primary" isPending={isPending}>
        {({ isPending }) => (
          <>
            {isPending && <Spinner color="current" size="sm" />}
            {t('profile.publicProfile.createForm.createButton')}
          </>
        )}
      </Button>

      <Button type="button" variant="secondary" isPending={isPending}>
        {({ isPending }) => (
          <>
            {isPending && <Spinner color="current" size="sm" />}
            {t('profile.publicProfile.createForm.cancelButton')}
          </>
        )}
      </Button>
    </Form>
  );
};

export default CreateForm;
