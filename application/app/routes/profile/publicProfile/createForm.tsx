import { useState, useActionState } from 'react';
import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Form, Input } from '@heroui/react';
import slugify from '@sindresorhus/slugify';

interface Props {
  onSubmit: (values: any) => Promise<{ name: string, slug: string, description: string, error?: string | null }>;
}

const CreateForm: FunctionComponent<Props> = ({ onSubmit }: Props) => {
  const { t } = useTranslation();
  const [ slug, setSlug ] = useState<string>('');
  const [state, formAction, isPending] = useActionState(onSubmit, { name: '', slug: '', description: '', error: null });

  const onChange = (event: any) => {
    if (event.target.name === 'name' || event.target.name === 'slug') {
      const value = event.target.value;
      setSlug(slugify(value, { lowercase: true, separator: '-' }));
    }
  }

  return (
    <Form action={formAction}>
      <Input
        isRequired
        label={t("profile.publicProfile.createForm.fieldName")}
        labelPlacement="outside"
        type="text"
        name="name"
        errorMessage={t("profile.publicProfile.createForm.mandatoryField")}
        defaultValue={state.name}
        onChange={onChange}
      />
      <Input
        isRequired
        label={t("profile.publicProfile.createForm.fieldSlug")}
        labelPlacement="outside"
        type="text"
        name="slug"
        placeholder=""
        value={slug}
        errorMessage={t("profile.publicProfile.createForm.mandatoryField")}
      />
      <p>
        {t("profile.publicProfile.createForm.fieldSlugHelp1")} <br />
        {t("profile.publicProfile.createForm.fieldSlugHelp2")} <a href={`https://zdielaj.si/${t("routes.prefix")}${t("routes.publicProfile").replace(':id', slug)}`}>https://zdielaj.si/{t("routes.prefix")}{t("routes.publicProfile").replace(':id', slug)}</a>
      </p>
      <Input
        label={t("profile.publicProfile.createForm.fieldDescription")}
        labelPlacement="outside"
        type="textarea"
        name="description"
        errorMessage={t("profile.publicProfile.createForm.mandatoryField")}
      />

      <Button type="submit" isLoading={isPending} color="primary">
        {t("profile.publicProfile.createForm.createButton")}
      </Button>

      <Button type="button" isLoading={isPending} color="secondary">
        {t("profile.publicProfile.createForm.cancelButton")}
      </Button>
    </Form>
  );
};

export default CreateForm;
