import { useState } from 'react';
import { Button, Dropdown, Label } from '@heroui/react';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink, useLocation, useNavigate, matchPath } from 'react-router';
import useAuth from '../utils/useAuth';
import { ROUTES } from '../constants';

export default function menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { i18n, t } = useTranslation('', { keyPrefix: 'components.menu' });
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const onChangeLang = (code: string) => {
    const pathname = location.pathname;

    const route = Object.keys(ROUTES[i18n.language as keyof typeof ROUTES]).find((key) => {
      return matchPath(
        `/${ROUTES[i18n.language as keyof typeof ROUTES].prefix}${(ROUTES as any)[i18n.language][key]}`,
        pathname
      );
    });

    const pathnameParts = pathname.split('/');
    const newPathnameParts =
      `/${ROUTES[code as keyof typeof ROUTES].prefix}${(ROUTES as any)[code][route as string]}`.split('/');

    const redirectPathname = newPathnameParts
      .map((part, index) => {
        if (part.startsWith(':')) {
          return pathnameParts[index];
        }
        return part;
      })
      .join('/');

    i18n.changeLanguage(code);
    navigate(redirectPathname);
  };

  const lang =
    i18n.language === 'sk' ? (
      <>&#x1F1F8;&#x1F1F0; SK</>
    ) : i18n.language === 'en' ? (
      <>&#x1F1EC;&#x1F1E7; EN</>
    ) : i18n.language === 'cz' ? (
      <>&#x1F1E8;&#x1F1FF; CZ</>
    ) : i18n.language === 'de' ? (
      <>&#x1F1E9;&#x1F1EA; DE</>
    ) : i18n.language === 'es' ? (
      <>&#x1F1EA;&#x1F1F8; ES</>
    ) : i18n.language === 'fr' ? (
      <>&#x1F1EB;&#x1F1F7; FR</>
    ) : i18n.language === 'it' ? (
      <>&#127470;&#127481; IT</>
    ) : i18n.language === 'pl' ? (
      <>&#127477;&#127473; PL</>
    ) : i18n.language === 'nl' ? (
      <>&#127475;&#127473; NL</>
    ) : i18n.language === 'si' ? (
      <>&#127480;&#127470; SI</>
    ) : i18n.language === 'fi' ? (
      <>&#127467;&#127470; FI</>
    ) : i18n.language === 'se' ? (
      <>&#127480;&#127466; SE</>
    ) : i18n.language === 'no' ? (
      <>&#127475;&#127476; NO</>
    ) : i18n.language === 'dk' ? (
      <>&#127465;&#127472; DK</>
    ) : i18n.language === 'hu' ? (
      <>&#127469;&#127482; HU</>
    ) : (
      <>&#x1F1F8;&#x1F1F0; SK</>
    );

  return (
    <nav className="w-full border-b border-separator bg-background">
      <header className="flex h-16 items-center px-6">
        <div className="flex items-center gap-4 flex-1">
          <button
            className="sm:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? t('navbarToggleClose') : t('navbarToggleOpen')}
            aria-expanded={isMenuOpen}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
          <RouterLink
            to={`/${i18n.language}`}
            className="font-bold text-lg"
            data-tracking-id="desktop_menu_home_click"
          >
            Zdielaj.si
          </RouterLink>
        </div>

        {user !== null ? (
          <ul className="hidden sm:flex items-center gap-4 flex-1 justify-center">
            <li>
              <RouterLink
                to={`/${i18n.language}/${ROUTES[i18n.language as keyof typeof ROUTES].albums}`}
                className="text-foreground"
                data-tracking-id="desktop_menu_albums_click"
              >
                {t('albums')}
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to={`/${i18n.language}/${ROUTES[i18n.language as keyof typeof ROUTES].profile}`}
                className="text-foreground"
                data-tracking-id="desktop_menu_profile_click"
              >
                {t('profile')}
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to={`/${i18n.language}/${ROUTES[i18n.language as keyof typeof ROUTES].subscription}`}
                className="text-foreground"
                data-tracking-id="desktop_menu_subscription_click"
              >
                {t('subscription')}
              </RouterLink>
            </li>
          </ul>
        ) : null}

        <div className="flex items-center gap-4 flex-1 justify-end">
          {user === null ? (
            <>
              <RouterLink
                to={`/${i18n.language}/${ROUTES[i18n.language as keyof typeof ROUTES].signIn}`}
                className="hidden sm:flex"
                data-tracking-id="desktop_menu_sign_in_click"
              >
                {t('signIn')}
              </RouterLink>
              <RouterLink
                to={`/${i18n.language}/${ROUTES[i18n.language as keyof typeof ROUTES].signUp}`}
                className="button bg-blue-200 hover:bg-blue-300 text-base hidden sm:flex"
                data-tracking-id="desktop_menu_sign_up_click"
              >
                {t('signUp')}
              </RouterLink>
            </>
          ) : (
            <Button
              variant="tertiary"
              onPress={signOut}
              className="hidden sm:flex"
              data-tracking-id="desktop_menu_sign_out_click"
            >
              {t('signOut')}
            </Button>
          )}
          <Dropdown>
            <Button
              className="p-0 bg-transparent rounded-sm hover:bg-transparent"
              variant="ghost"
            >
              {lang}
            </Button>
            <Dropdown.Popover>
              <Dropdown.Menu
                aria-label="Select language"
                className="gap-4"
                onAction={(key) => onChangeLang(key as string)}
              >
                <Dropdown.Item id="sk" textValue="SK"><Label>&#x1F1F8;&#x1F1F0; SK</Label></Dropdown.Item>
                <Dropdown.Item id="cz" textValue="CZ"><Label>&#x1F1E8;&#x1F1FF; CZ</Label></Dropdown.Item>
                <Dropdown.Item id="en" textValue="EN"><Label>&#x1F1EC;&#x1F1E7; EN</Label></Dropdown.Item>
                <Dropdown.Item id="de" textValue="DE"><Label>&#x1F1E9;&#x1F1EA; DE</Label></Dropdown.Item>
                <Dropdown.Item id="es" textValue="ES"><Label>&#x1F1EA;&#x1F1F8; ES</Label></Dropdown.Item>
                <Dropdown.Item id="fr" textValue="FR"><Label>&#x1F1EB;&#x1F1F7; FR</Label></Dropdown.Item>
                <Dropdown.Item id="it" textValue="IT"><Label>&#127470;&#127481; IT</Label></Dropdown.Item>
                <Dropdown.Item id="pl" textValue="PL"><Label>&#127477;&#127473; PL</Label></Dropdown.Item>
                <Dropdown.Item id="nl" textValue="NL"><Label>&#127475;&#127473; NL</Label></Dropdown.Item>
                <Dropdown.Item id="si" textValue="SI"><Label>&#127480;&#127470; SI</Label></Dropdown.Item>
                <Dropdown.Item id="fi" textValue="FI"><Label>&#127467;&#127470; FI</Label></Dropdown.Item>
                <Dropdown.Item id="se" textValue="SE"><Label>&#127480;&#127466; SE</Label></Dropdown.Item>
                <Dropdown.Item id="no" textValue="NO"><Label>&#127475;&#127476; NO</Label></Dropdown.Item>
                <Dropdown.Item id="dk" textValue="DK"><Label>&#127465;&#127472; DK</Label></Dropdown.Item>
                <Dropdown.Item id="hu" textValue="HU"><Label>&#127469;&#127482; HU</Label></Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Popover>
          </Dropdown>
        </div>
      </header>

      {isMenuOpen && (
        <div className="border-t border-separator sm:hidden">
          <ul className="flex flex-col gap-2 p-4">
            {user !== null ? (
              <>
                <li>
                  <RouterLink
                    className="link block w-full py-2 text-lg text-foreground"
                    to={`/${i18n.language}/${ROUTES[i18n.language as keyof typeof ROUTES].albums}`}
                    onClick={() => setIsMenuOpen(false)}
                    data-tracking-id="mobile_menu_albums_click"
                  >
                    {t('albums')}
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    className="link block w-full py-2 text-lg text-foreground"
                    to={`/${i18n.language}/${ROUTES[i18n.language as keyof typeof ROUTES].profile}`}
                    onClick={() => setIsMenuOpen(false)}
                    data-tracking-id="mobile_menu_profile_click"
                  >
                    {t('profile')}
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    className="link block w-full py-2 text-lg text-foreground"
                    to={`/${i18n.language}/${ROUTES[i18n.language as keyof typeof ROUTES].subscription}`}
                    onClick={() => setIsMenuOpen(false)}
                    data-tracking-id="mobile_menu_subscription_click"
                  >
                    {t('subscription')}
                  </RouterLink>
                </li>
                <li>
                  <button
                    className="block w-full text-start py-2 text-lg text-danger"
                    onClick={signOut}
                    data-tracking-id="mobile_menu_sign_out_click"
                  >
                    {t('signOut')}
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <RouterLink
                    className="link block w-full py-2 text-lg text-foreground"
                    to={`/${i18n.language}/${ROUTES[i18n.language as keyof typeof ROUTES].signIn}`}
                    onClick={() => setIsMenuOpen(false)}
                    data-tracking-id="mobile_menu_sign_in_click"
                  >
                    {t('signIn')}
                  </RouterLink>
                </li>
                <li>
                  <RouterLink
                    className="link block w-full py-2 text-lg text-foreground"
                    to={`/${i18n.language}/${ROUTES[i18n.language as keyof typeof ROUTES].signUp}`}
                    onClick={() => setIsMenuOpen(false)}
                    data-tracking-id="mobile_menu_sign_up_click"
                  >
                    {t('signUp')}
                  </RouterLink>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}
