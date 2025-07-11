import type { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router';

interface Props {
  onActivate: () => void;
}

const Activate: FunctionComponent<Props> = ({ onActivate }: Props) => {
  const { t } = useTranslation();

  return (
    <Alert variant="info">
      <Alert.Heading>{t("profile.publicProfile.activate.title")}</Alert.Heading>
      <p>{t("profile.publicProfile.activate.subtitle")}</p>
      <p>
        {t("profile.publicProfile.activate.moreInfo")} <Link to={`/${t("routes.prefix")}${t("routes.about")}`}>{t("profile.publicProfile.activate.moreInfoLink")}</Link>.
      </p>
      <hr />
      <Button onClick={onActivate}>{t("profile.publicProfile.activate.cta")}</Button>
    </Alert>
  );
};

export default Activate;
