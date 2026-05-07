import { useActionState } from 'react';
import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Button, Form, TextField, Label, Input, TextArea, FieldError, Spinner } from '@heroui/react';

interface Props {
  publicProfile: PublicProfile;
  onSubmit: (prevState: unknown, values: FormData) => any;
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
    },
  });

  return (
    <Form action={formAction} className="space-y-6">
      {state.error ? (
        <Alert status="danger">
          <Alert.Content>
            <Alert.Description>{state.error.message}</Alert.Description>
          </Alert.Content>
        </Alert>
      ) : null}

      <TextField name="name" type="text" defaultValue={state.name} isInvalid={!!state.error}>
        <Label>{t('profile.publicProfile.updateForm.fieldName')}</Label>
        <Input placeholder="" />
        <FieldError>{t('profile.publicProfile.updateForm.mandatoryField')}</FieldError>
      </TextField>

      <TextField name="slug" type="text" defaultValue={publicProfile.id} isInvalid={!!state.error} isDisabled>
        <Label>{t('profile.publicProfile.updateForm.fieldSlug')}</Label>
        <Input placeholder="" />
        <FieldError>{t('profile.publicProfile.updateForm.mandatoryField')}</FieldError>
      </TextField>

      <TextField name="description" isInvalid={!!state.error} defaultValue={state.description}>
        <Label>{t('profile.publicProfile.updateForm.fieldDescription')}</Label>
        <TextArea />
        <FieldError>{t('profile.publicProfile.updateForm.mandatoryField')}</FieldError>
      </TextField>

      <TextField name="contact[homepage]" type="text" defaultValue={state.contact.homepage}>
        <Label>{t('profile.publicProfile.updateForm.fieldHomepage')}</Label>
        <Input placeholder="https://zdielaj.si" />
      </TextField>

      <TextField name="contact[facebook]" type="text" defaultValue={state.contact.facebook}>
        <Label>{t('profile.publicProfile.updateForm.fieldFacebook')}</Label>
        <Input placeholder="https://www.facebook.com/zdielaj.si" />
      </TextField>

      <TextField name="contact[instagram]" type="text" defaultValue={state.contact.instagram}>
        <Label>{t('profile.publicProfile.updateForm.fieldInstagram')}</Label>
        <Input placeholder="https://www.instagram.com/zdielaj.si" />
      </TextField>

      <TextField name="contact[pinterest]" type="text" defaultValue={state.contact.pinterest}>
        <Label>{t('profile.publicProfile.updateForm.fieldPinterest')}</Label>
        <Input placeholder="https://www.pinterest.com/zdielaj.si" />
      </TextField>

      <TextField name="contact[strava]" type="text" defaultValue={state.contact.strava}>
        <Label>{t('profile.publicProfile.updateForm.fieldStrava')}</Label>
        <Input placeholder="https://www.strava.com/clubs/1135445" />
      </TextField>

      <Button type="submit" variant="primary" isPending={isPending}>
        {({ isPending }) => (
          <>
            {isPending && <Spinner color="current" size="sm" />}
            {t('profile.publicProfile.updateForm.submitButton')}
          </>
        )}
      </Button>
    </Form>
  );
};

export default UpdateForm;
