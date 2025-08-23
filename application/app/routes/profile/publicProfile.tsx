import { use, useState } from 'react';
import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import Activate from './publicProfile/activateForm';
import CreateForm from './publicProfile/createForm';
import UpdateForm from './publicProfile/updateForm';
import { createPublicProfile, updatePublicProfile } from '../../api/publicprofiles';
import logger from '../../logger';

interface Props {
  getCurrentUserPublicProfilePromise: Promise<PublicProfile | null>;
}

const PublicProfile: FunctionComponent<Props> = ({ getCurrentUserPublicProfilePromise }: Props) => {
  const { t } = useTranslation();
  const publicProfile = use(getCurrentUserPublicProfilePromise);
  const [ formType, setFormType ] = useState<'info' | 'create' | 'update'>(publicProfile === null ? 'info' : 'update');

  const onActivate = () => {
    setFormType('create');
  };

  const onCreate = async (values: FormData) => {
    try {
      const publicProfile = await createPublicProfile(values.get('slug') as string, values.get('name') as string, values.get('description') as string);

      setFormType('update');

      return publicProfile;
    } catch (error) {
      logger.error(error);

      return {
        error: {
          message: t('profile.publicProfile.createForm.errorMessage')
        },
      };
    }
  }

  const onUpdate = async (prevState: unknown, values: FormData) => {
    const data = {
      name: values.get('name') as string,
      description: values.get('description') as string,
      contact: {
        homepage: values.get('contact[homepage]') as string,
        facebook: values.get('contact[facebook]') as string,
        instagram: values.get('contact[instagram]') as string,
        pinterest: values.get('contact[pinterest]') as string,
        strava: values.get('contact[strava]') as string,
      },
    };

    try {
      const updatedPublicProfile = await updatePublicProfile(publicProfile?.id as string, data);

      return updatedPublicProfile;
    } catch (error) {
      logger.error(error);

      return {
        error: {
          message: t('profile.publicProfile.updateForm.errorMessage')
        }
      };
    }
  }

  return (
    <>
      {
        publicProfile === null && formType === 'info' ? (
          <Activate onActivate={onActivate} />
        ) : null
      }
      {
        formType === 'create' && publicProfile === null ? (
          <CreateForm
            onSubmit={onCreate}
          />
        ) : null
      }
      {
        formType === 'update' && publicProfile !== null ? (
          <UpdateForm publicProfile={publicProfile} onSubmit={onUpdate} />
        ) : null
      }
    </>
  );
};

export default PublicProfile;
