import { Alert, Button } from '@heroui/react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <Alert color="warning" hideIcon={true}>
      <h1 className="text-center mb-2 text-2xl w-full">{t("album.notFound.title")}</h1>
      <p className="text-center mb-2 text-lg w-full">{t("album.notFound.subtitle")}</p>
      <p className="text-center mb-4 text-sm w-full">{t("album.notFound.clarifyingText")}</p>
      <Button as={Link} to={`/${t("routes.prefix")}${t("routes.home")}`} variant="bordered" className="w-100 mx-auto" data-tracking-id="album_not_found_click">{t("album.notFound.ctaButton")}</Button>
    </Alert>
  );
}

export default NotFound;
