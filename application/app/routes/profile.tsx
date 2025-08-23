import { Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { Accordion, AccordionItem } from '@heroui/accordion';
import NotFound from './albums/notFound';
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

export function meta() {
  const { t } = useTranslation('', { keyPrefix: 'profile' });
  return [
    { title: `${t("title")} | Zdielaj.si` },
    { name: "description", content: "Profile" },
  ];
}

export default function Profile() {
  const { t } = useTranslation('', { keyPrefix: 'profile' });
  const { user } = useAuth(); 
  const userPromise = getCurrentUser(user?.accessToken as string);
  const publicProfilePromise = userPromise.then(user => user.publicProfileId ? getPublicProfile(user.publicProfileId as string) : Promise.resolve(null));

  return (
    <ErrorBoundary notFound={<NotFound />}>
      <Suspense fallback={<ProfileLoader />}>
        <Accordion keepContentMounted={true}>
          <AccordionItem key="1" aria-label={t("detail.title")} title={t("detail.title")} classNames={{ title: "text-xl font-medium" }}>
            <Detail getCurrentUserPromise={userPromise} />
          </AccordionItem>
          <AccordionItem key="2" aria-label={t("changePassword.title")} title={t("changePassword.title")} classNames={{ title: "text-xl font-medium" }}>
            <ChangePassword />
          </AccordionItem>
          <AccordionItem key="3" aria-label={t("mfa.title")} title={t("mfa.title")} classNames={{ title: "text-xl font-medium" }}>
            <MFA />
          </AccordionItem>
          <AccordionItem key="4" aria-label={t("publicProfile.title")} title={t("publicProfile.title")} classNames={{ title: "text-xl font-medium" }}>
            <PublicProfile getCurrentUserPublicProfilePromise={publicProfilePromise} />
          </AccordionItem>
          <AccordionItem key="5" aria-label={t("statistics.title")} title={t("statistics.title")} classNames={{ title: "text-xl font-medium" }}>
            <Statistics getCurrentUserPromise={userPromise} />
          </AccordionItem>
          <AccordionItem key="6" aria-label={t("deleteProfile.title")} title={t("deleteProfile.title")} classNames={{ title: "text-xl font-medium" }}>
            <DeleteProfile />
          </AccordionItem>
        </Accordion>
      </Suspense>
    </ErrorBoundary>
  );
}
