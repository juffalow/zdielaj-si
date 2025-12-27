import { useEffect, useState, Suspense } from 'react';
import type { Route } from './+types/profile';
import { useTranslation } from 'react-i18next';
import { Accordion, AccordionItem } from '@heroui/accordion';
import ProfileLoader from './profile/loader';
import Detail from './profile/detail';
import ChangePassword from './profile/changePassword';
import MFA from './profile/mfa';
import PublicProfile from './profile/publicProfile';
import Statistics from './profile/statistics';
import DeleteProfile from './profile/deleteProfile';
import ErrorBoundary from '../components/errorBoundary';
import { getCurrentUser } from '../api/user';
import { getPublicProfile } from '../api/publicprofiles';
import useAuth from '../utils/useAuth';

export function meta({ location }: Route.MetaArgs) {
  const language = location.pathname.split('/')[1];

  switch (language) {
    case 'sk':
      return [{ title: 'Profil | Zdielaj.si' }];
    case 'cz':
      return [{ title: 'Profil | Zdielaj.si' }];
    case 'de':
      return [{ title: 'Profil | Zdielaj.si' }];
    case 'es':
      return [{ title: 'Profil | Zdielaj.si' }];
    case 'fr':
      return [{ title: 'Profil | Zdielaj.si' }];
    case 'it':
      return [{ title: 'Profilo | Zdielaj.si' }];
    case 'pl':
      return [{ title: 'Profil | Zdielaj.si' }];
    case 'nl':
      return [{ title: 'Profiel | Zdielaj.si' }];
    case 'si':
      return [{ title: 'Profil | Zdielaj.si' }];
    case 'fi':
      return [{ title: 'Profiili | Zdielaj.si' }];
    case 'se':
      return [{ title: 'Profil | Zdielaj.si' }];
    case 'no':
      return [{ title: 'Profil | Zdielaj.si' }];
    case 'dk':
      return [{ title: 'Profil | Zdielaj.si' }];
    case 'hu':
      return [{ title: 'Profil | Zdielaj.si' }];
    case 'en':
    default:
      return [{ title: 'Profile | Zdielaj.si' }];
  }
}

export default function Profile() {
  const { t } = useTranslation('', { keyPrefix: 'profile' });
  const { user } = useAuth();
  const [userPromise, setUserPromise] = useState<Promise<User> | null>(null);
  const [publicProfilePromise, setPublicProfilePromise] = useState<Promise<PublicProfile | null> | null>(null);

  useEffect(() => {
    if (user === null || userPromise !== null || publicProfilePromise !== null) {
      return;
    }

    const currentUserPromise = getCurrentUser();

    setUserPromise(currentUserPromise);
    setPublicProfilePromise(
      currentUserPromise.then((user) =>
        user.publicProfileId ? getPublicProfile(user.publicProfileId as string) : Promise.resolve(null)
      )
    );
  }, [user]);

  return (
    <ErrorBoundary>
      {userPromise && publicProfilePromise ? (
        <Suspense fallback={<ProfileLoader />}>
          <Accordion keepContentMounted={true}>
            <AccordionItem
              key="1"
              aria-label={t('detail.title')}
              title={t('detail.title')}
              classNames={{ title: 'text-xl font-medium' }}
            >
              <Detail getCurrentUserPromise={userPromise} />
            </AccordionItem>
            <AccordionItem
              key="2"
              aria-label={t('changePassword.title')}
              title={t('changePassword.title')}
              classNames={{ title: 'text-xl font-medium' }}
            >
              <ChangePassword />
            </AccordionItem>
            <AccordionItem
              key="3"
              aria-label={t('mfa.title')}
              title={t('mfa.title')}
              classNames={{ title: 'text-xl font-medium' }}
            >
              <MFA />
            </AccordionItem>
            <AccordionItem
              key="4"
              aria-label={t('publicProfile.title')}
              title={t('publicProfile.title')}
              classNames={{ title: 'text-xl font-medium' }}
            >
              <PublicProfile getCurrentUserPublicProfilePromise={publicProfilePromise} />
            </AccordionItem>
            <AccordionItem
              key="5"
              aria-label={t('statistics.title')}
              title={t('statistics.title')}
              classNames={{ title: 'text-xl font-medium' }}
            >
              <Statistics getCurrentUserPromise={userPromise} />
            </AccordionItem>
            <AccordionItem
              key="6"
              aria-label={t('deleteProfile.title')}
              title={t('deleteProfile.title')}
              classNames={{ title: 'text-xl font-medium' }}
            >
              <DeleteProfile />
            </AccordionItem>
          </Accordion>
        </Suspense>
      ) : null}
    </ErrorBoundary>
  );
}
