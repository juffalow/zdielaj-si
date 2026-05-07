import { useTranslation, Trans } from 'react-i18next';
import { Link } from 'react-router';
import { ROUTES } from '../../constants';

export default function UploadInfo({ user }: { user: User | null }) {
  const { i18n } = useTranslation();

  if (user === null) {
    return (
      <div className="mt-3">
        <ul className="d-inline-block mx-auto fst-italic text-center" style={{ fontSize: '0.8rem' }}>
          <li>
            <Trans i18nKey="home.uploadInfo.maxPhotosForUnregisteredUser" components={{ strong: <strong /> }} />
          </li>
          <li>
            <Trans i18nKey="home.uploadInfo.fileSizeForUnregisteredUser" components={{ strong: <strong /> }} />
          </li>
          <li>
            <Trans i18nKey="home.uploadInfo.retentionPeriodForUnregisteredUser" components={{ strong: <strong /> }} />
          </li>
        </ul>
        <p className="mt-3 text-center" style={{ fontSize: '0.9rem' }}>
          <Trans
            i18nKey="home.uploadInfo.signInOrSignUp"
            components={{
              signinlink: (
                <Link
                  to={`/${i18n.language}/${ROUTES[i18n.language as keyof typeof ROUTES].signIn}`}
                  data-tracking-id="upload_info_unregistered_user_sign_in_link"
                  className="link"
                />
              ),
              signuplink: (
                <Link
                  to={`/${i18n.language}/${ROUTES[i18n.language as keyof typeof ROUTES].signUp}`}
                  data-tracking-id="upload_info_unregistered_user_sign_up_link"
                  className="link"
                />
              ),
            }}
          />
        </p>
      </div>
    );
  }

  return null;
}
