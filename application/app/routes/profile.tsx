import { useEffect, useState, Suspense } from 'react';
import type { Route } from './+types/profile';
import { useTranslation } from 'react-i18next';
import { Accordion } from '@heroui/react';
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
          <Accordion>
            <Accordion.Item id="1">
              <Accordion.Heading>
                <Accordion.Trigger className="text-xl font-medium">
                  {t('detail.title')}
                  <Accordion.Indicator />
                </Accordion.Trigger>
              </Accordion.Heading>
              <Accordion.Panel>
                <Accordion.Body>
                  <Detail getCurrentUserPromise={userPromise} />
                </Accordion.Body>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item id="2">
              <Accordion.Heading>
                <Accordion.Trigger className="text-xl font-medium">
                  {t('changePassword.title')}
                  <Accordion.Indicator />
                </Accordion.Trigger>
              </Accordion.Heading>
              <Accordion.Panel>
                <Accordion.Body>
                  <ChangePassword />
                </Accordion.Body>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item id="3">
              <Accordion.Heading>
                <Accordion.Trigger className="text-xl font-medium">
                  {t('mfa.title')}
                  <Accordion.Indicator />
                </Accordion.Trigger>
              </Accordion.Heading>
              <Accordion.Panel>
                <Accordion.Body>
                  <MFA />
                </Accordion.Body>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item id="4">
              <Accordion.Heading>
                <Accordion.Trigger className="text-xl font-medium">
                  {t('publicProfile.title')}
                  <Accordion.Indicator />
                </Accordion.Trigger>
              </Accordion.Heading>
              <Accordion.Panel>
                <Accordion.Body>
                  <PublicProfile getCurrentUserPublicProfilePromise={publicProfilePromise} />
                </Accordion.Body>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item id="5">
              <Accordion.Heading>
                <Accordion.Trigger className="text-xl font-medium">
                  {t('statistics.title')}
                  <Accordion.Indicator />
                </Accordion.Trigger>
              </Accordion.Heading>
              <Accordion.Panel>
                <Accordion.Body>
                  <Statistics getCurrentUserPromise={userPromise} />
                </Accordion.Body>
              </Accordion.Panel>
            </Accordion.Item>
            <Accordion.Item id="6">
              <Accordion.Heading>
                <Accordion.Trigger className="text-xl font-medium">
                  {t('deleteProfile.title')}
                  <Accordion.Indicator />
                </Accordion.Trigger>
              </Accordion.Heading>
              <Accordion.Panel>
                <Accordion.Body>
                  <DeleteProfile />
                </Accordion.Body>
              </Accordion.Panel>
            </Accordion.Item>
          </Accordion>
        </Suspense>
      ) : null}
    </ErrorBoundary>
  );
}
