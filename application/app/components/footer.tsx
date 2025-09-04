import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation('', { keyPrefix: 'components.footer' });

  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto w-full p-4 py-6 lg:py-8">
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="https://zdielaj.si/" className="flex items-center">
              <img
                src="/zdielaj-si-logo.png"
                className="h-8 me-3"
                alt="Zdielaj.si logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Zdielaj.si
              </span>
            </a>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">2021 - {new Date().getFullYear()}</p>
            <p className="mt-4" style={{ fontSize: '0.9rem' }}>{t("description")}</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                {t("links")}
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link
                    className="nav-link text-light"
                    to={`${t("prefix", { keyPrefix: 'routes' })}${t("home", { keyPrefix: 'routes' })}`}
                    data-tracking-id="footer_link_home_click"
                  >
                    {t("home")}
                  </Link>
                </li>
                <li className="mb-4">
                  <Link
                    className="nav-link text-light"
                    to={`${t("prefix", { keyPrefix: 'routes' })}${t("signUp", { keyPrefix: 'routes' })}`}
                    data-tracking-id="footer_link_register_click"
                  >
                    {t("register")}
                  </Link>
                </li>
                <li>
                  <Link
                    className="nav-link text-light"
                    to="https://status.zdielaj.si/"
                    data-tracking-id="footer_link_status_click"
                  >
                    {t("status")}
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                {t("contact")}
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li>
                  <a
                    className="nav-link text-light"
                    href="mailto:info@zdielaj.si"
                    data-tracking-id="footer_link_email_click"
                  >
                    info@zdielaj.si
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
