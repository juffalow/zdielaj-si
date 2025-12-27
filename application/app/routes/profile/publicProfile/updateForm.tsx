import { useActionState } from 'react';
import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Button, Form, Input } from '@heroui/react';

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
    <Form action={formAction}>
      {state.error ? <Alert color="danger">{state.error.message}</Alert> : null}
      <Input
        label={t('profile.publicProfile.updateForm.fieldName')}
        labelPlacement="outside"
        type="text"
        name="name"
        placeholder=""
        defaultValue={state.name}
        isInvalid={!!state.error}
        errorMessage={t('profile.publicProfile.updateForm.mandatoryField')}
      />

      <Input
        label={t('profile.publicProfile.updateForm.fieldSlug')}
        labelPlacement="outside"
        type="text"
        name="slug"
        placeholder=""
        defaultValue={publicProfile.id}
        isInvalid={!!state.error}
        errorMessage={t('profile.publicProfile.updateForm.mandatoryField')}
        disabled
      />

      <Input
        label={t('profile.publicProfile.updateForm.fieldDescription')}
        labelPlacement="outside"
        type="textarea"
        name="description"
        defaultValue={state.description}
        isInvalid={!!state.error}
        errorMessage={t('profile.publicProfile.updateForm.mandatoryField')}
      />

      <Input
        label={t('profile.publicProfile.updateForm.fieldHomepage')}
        labelPlacement="outside"
        type="text"
        name="contact[homepage]"
        placeholder="https://zdielaj.si"
        defaultValue={state.contact.homepage}
      />

      <Input
        label={t('profile.publicProfile.updateForm.fieldFacebook')}
        labelPlacement="outside"
        type="text"
        name="contact[facebook]"
        placeholder="https://www.facebook.com/zdielaj.si"
        defaultValue={state.contact.facebook}
      />

      <Input
        label={t('profile.publicProfile.updateForm.fieldInstagram')}
        labelPlacement="outside"
        type="text"
        name="contact[instagram]"
        placeholder="https://www.instagram.com/zdielaj.si"
        defaultValue={state.contact.instagram}
      />

      <Input
        label={t('profile.publicProfile.updateForm.fieldPinterest')}
        labelPlacement="outside"
        type="text"
        name="contact[pinterest]"
        placeholder="https://www.pinterest.com/zdielaj.si"
        defaultValue={state.contact.pinterest}
      />

      <Input
        label={t('profile.publicProfile.updateForm.fieldStrava')}
        labelPlacement="outside"
        type="text"
        name="contact[strava]"
        placeholder="https://www.strava.com/clubs/1135445"
        defaultValue={state.contact.strava}
      />

      <Button type="submit" isLoading={isPending} color="primary">
        {t('profile.publicProfile.updateForm.submitButton')}
      </Button>
    </Form>
  );
};

export default UpdateForm;
