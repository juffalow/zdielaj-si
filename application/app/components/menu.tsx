import { useState } from 'react';
import type { MouseEvent } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/react';
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

  const onChangeLang = (e: MouseEvent) => {
    const code = (e.target as HTMLElement).getAttribute('data-lang') || 'sk';
    const pathname = location.pathname;

    const route = Object.keys(ROUTES[i18n.language as keyof typeof ROUTES]).find(key => {
      return matchPath(`/${ROUTES[i18n.language as keyof typeof ROUTES].prefix}${(ROUTES as any)[i18n.language][key]}`, pathname);
    });

    const pathnameParts = pathname.split('/');
    const newPathnameParts = `/${ROUTES[code as keyof typeof ROUTES].prefix}${(ROUTES as any)[code][route as string]}`.split('/');

    const redirectPathname = newPathnameParts.map((part, index) => {
      if (part.startsWith(':')) {
        return pathnameParts[index];
      }
      return part;
    }).join('/');

    i18n.changeLanguage(code);
    navigate(redirectPathname);
  };

  const lang = i18n.language === 'sk' ? (<>&#x1F1F8;&#x1F1F0; SK</>)
    : i18n.language === 'en' ? (<>&#x1F1EC;&#x1F1E7; EN</>)
    : i18n.language === 'cz' ? (<>&#x1F1E8;&#x1F1FF; CZ</>)
    : i18n.language === 'de' ? (<>&#x1F1E9;&#x1F1EA; DE</>)
    : i18n.language === 'es' ? (<>&#x1F1EA;&#x1F1F8; ES</>)
    : i18n.language === 'fr' ? (<>&#x1F1EB;&#x1F1F7; FR</>)
    : i18n.language === 'it' ? (<>&#127470;&#127481; IT</>)
    : i18n.language === 'pl' ? (<>&#127477;&#127473; PL</>)
    : i18n.language === 'nl' ? (<>&#127475;&#127473; NL</>)
    : i18n.language === 'si' ? (<>&#127480;&#127470; SI</>)
    : i18n.language === 'fi' ? (<>&#127467;&#127470; FI</>)
    : i18n.language === 'se' ? (<>&#127480;&#127466; SE</>)
    : i18n.language === 'no' ? (<>&#127475;&#127476; NO</>)
    : i18n.language === 'dk' ? (<>&#127465;&#127472; DK</>)
    : i18n.language === 'hu' ? (<>&#127469;&#127482; HU</>)
    : (<>&#x1F1F8;&#x1F1F0; SK</>);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} position="static" maxWidth="full" isBordered>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link as={RouterLink} to={`/${t('prefix', { keyPrefix: 'routes' })}`} className="font-bold text-inherit" data-tracking-id="desktop_menu_home_click">Zdielaj.si</Link>
        </NavbarBrand>
      </NavbarContent>

      {
        user !== null ? (
          <NavbarContent className="hidden sm:flex gap-4" justify="center">
            <NavbarItem>
              <Link as={RouterLink} to={`/${t('prefix', { keyPrefix: 'routes' })}${t('albums', { keyPrefix: 'routes' })}`} color="foreground" data-tracking-id="desktop_menu_albums_click">
                {t('albums')}
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link as={RouterLink} to={`/${t('prefix', { keyPrefix: 'routes' })}${t('userProfile', { keyPrefix: 'routes' })}`} color="foreground" data-tracking-id="desktop_menu_profile_click">
                {t('profile')}
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Link as={RouterLink} to={`/${t('prefix', { keyPrefix: 'routes' })}${t('subscription', { keyPrefix: 'routes' })}`} color="foreground" data-tracking-id="desktop_menu_subscription_click">
                {t('subscription')}
              </Link>
            </NavbarItem>
          </NavbarContent>
        ) : null
      }

      <NavbarContent justify="end">
        {
          user === null ? (
            <>
              <NavbarItem className="hidden sm:flex">
                <Link as={RouterLink} to={`/${t('prefix', { keyPrefix: 'routes' })}${t('signIn', { keyPrefix: 'routes' })}`} data-tracking-id="desktop_menu_sign_in_click">{t('signIn')}</Link>
              </NavbarItem>
              <NavbarItem className="hidden sm:flex">
                <Button as={RouterLink} to={`/${t('prefix', { keyPrefix: 'routes' })}${t('signUp', { keyPrefix: 'routes' })}`} color="primary" variant="flat" data-tracking-id="desktop_menu_sign_up_click">
                  {t('signUp')}
                </Button>
              </NavbarItem>
            </>
          ) : (
            <NavbarItem className="hidden sm:flex">
              <Button color="primary" variant="flat" onPress={signOut} data-tracking-id="desktop_menu_sign_out_click">
                {t('signOut')}
              </Button>
            </NavbarItem>
          )
        }
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                radius="sm"
                variant="light"
              >
                {lang}
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
            itemClasses={{
              base: "gap-4",
            }}
          >
            <DropdownItem key="sk" onClick={onChangeLang} data-lang="sk" className="cursor-pointer">
              &#x1F1F8;&#x1F1F0; SK
            </DropdownItem>
            <DropdownItem key="cz" onClick={onChangeLang} data-lang="cz" className="cursor-pointer">
              &#x1F1E8;&#x1F1FF; CZ
            </DropdownItem>
            <DropdownItem key="en" onClick={onChangeLang} data-lang="en" className="cursor-pointer">
              &#x1F1EC;&#x1F1E7; EN
            </DropdownItem>
            <DropdownItem key="de" onClick={onChangeLang} data-lang="de" className="cursor-pointer">
              &#x1F1E9;&#x1F1EA; DE
            </DropdownItem>
            <DropdownItem key="es" onClick={onChangeLang} data-lang="es" className="cursor-pointer">
              &#x1F1EA;&#x1F1F8; ES
            </DropdownItem>
            <DropdownItem key="fr" onClick={onChangeLang} data-lang="fr" className="cursor-pointer">
              &#x1F1EB;&#x1F1F7; FR
            </DropdownItem>
            <DropdownItem key="it" onClick={onChangeLang} data-lang="it" className="cursor-pointer">
              &#127470;&#127481; IT
            </DropdownItem>
            <DropdownItem key="pl" onClick={onChangeLang} data-lang="pl" className="cursor-pointer">
              &#127477;&#127473; PL
            </DropdownItem>
            <DropdownItem key="nl" onClick={onChangeLang} data-lang="nl" className="cursor-pointer">
              &#127475;&#127473; NL
            </DropdownItem>
            <DropdownItem key="si" onClick={onChangeLang} data-lang="si" className="cursor-pointer">
              &#127480;&#127470; SI
            </DropdownItem>
            <DropdownItem key="fi" onClick={onChangeLang} data-lang="fi" className="cursor-pointer">
              &#127467;&#127470; FI
            </DropdownItem>
            <DropdownItem key="se" onClick={onChangeLang} data-lang="se" className="cursor-pointer">
              &#127480;&#127466; SE
            </DropdownItem>
            <DropdownItem key="no" onClick={onChangeLang} data-lang="no" className="cursor-pointer">
              &#127475;&#127476; NO
            </DropdownItem>
            <DropdownItem key="dk" onClick={onChangeLang} data-lang="dk" className="cursor-pointer">
              &#127465;&#127472; DK
            </DropdownItem>
            <DropdownItem key="hu" onClick={onChangeLang} data-lang="hu" className="cursor-pointer">
              &#127469;&#127482; HU
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
      <NavbarMenu>
        {
          user !== null ? (
            <>
              <NavbarMenuItem>
                <Link
                  as={RouterLink}
                  className="w-full"
                  color="foreground"
                  to={`/${t('prefix', { keyPrefix: 'routes' })}${t('albums', { keyPrefix: 'routes' })}`}
                  size="lg"
                  data-tracking-id="mobile_menu_albums_click"
                >
                  {t('albums')}
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link
                  as={RouterLink}
                  className="w-full"
                  color="foreground"
                  to={`/${t('prefix', { keyPrefix: 'routes' })}${t('userProfile', { keyPrefix: 'routes' })}`}
                  size="lg"
                  data-tracking-id="mobile_menu_profile_click"
                >
                  {t('profile')}
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link
                  as={RouterLink}
                  className="w-full"
                  color="foreground"
                  to={`/${t('prefix', { keyPrefix: 'routes' })}${t('subscription', { keyPrefix: 'routes' })}`}
                  size="lg"
                  data-tracking-id="mobile_menu_subscription_click"
                >
                  {t('subscription')}
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link
                  className="w-full"
                  color="danger"
                  size="lg"
                  onPress={signOut}
                  data-tracking-id="mobile_menu_sign_out_click"
                >
                  {t('signOut')}
                </Link>
              </NavbarMenuItem>
            </>
          ) : (
            <>
              <NavbarMenuItem>
                <Link
                  as={RouterLink}
                  className="w-full"
                  color="foreground"
                  to={`/${t('prefix', { keyPrefix: 'routes' })}${t('signIn', { keyPrefix: 'routes' })}`}
                  size="lg"
                  data-tracking-id="mobile_menu_sign_in_click"
                >
                  {t('signIn')}
                </Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link
                  as={RouterLink}
                  className="w-full"
                  color="foreground"
                  to={`/${t('prefix', { keyPrefix: 'routes' })}${t('signUp', { keyPrefix: 'routes' })}`}
                  size="lg"
                  data-tracking-id="mobile_menu_sign_up_click"
                >
                  {t('signUp')}
                </Link>
              </NavbarMenuItem>
            </>
          )
        }
      </NavbarMenu>
    </Navbar>
  );
}