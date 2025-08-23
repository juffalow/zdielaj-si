import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Button, Link } from '@heroui/react';
import { Link as RouterLink } from 'react-router';

interface Props {
  onActivate: () => void;
}

const Activate: FunctionComponent<Props> = ({ onActivate }: Props) => {
  const { t } = useTranslation();

  return (
    <Alert color="primary" hideIcon={true}>
      <p className="text-lg font-medium">{t("profile.publicProfile.activate.title")}</p>
      <p>{t("profile.publicProfile.activate.subtitle")}</p>
      <p className="mb-2">
        {t("profile.publicProfile.activate.moreInfo")} <Link as={RouterLink} to={`/${t("routes.prefix")}${t("routes.about")}`}>{t("profile.publicProfile.activate.moreInfoLink")}</Link>.
      </p>
      <hr />
      <Button color="primary" onPress={onActivate}>{t("profile.publicProfile.activate.cta")}</Button>
    </Alert>
  );
};

export default Activate;
