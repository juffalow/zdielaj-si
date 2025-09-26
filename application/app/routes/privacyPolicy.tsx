import type { FunctionComponent } from 'react';
import { useTranslation, Trans } from 'react-i18next';

const PrivacyPolicy: FunctionComponent = () => {
  const { t } = useTranslation('', { keyPrefix: 'privacyPolicy' });

  return (
    <div>
      <h1 className="text-center text-5xl font-bold">{t("title")}</h1>
      <p className="text-gray-500 mt-3 text-xl">{t("subtitle")}</p>

      <h2 className="text-center text-2xl font-semibold w-full mt-4">{t("firstSection.title")}</h2>
      <p>{t("firstSection.paragraph1")}</p>

      <h2 className="text-center text-2xl font-semibold w-full mt-4">{t("secondSection.title")}</h2>
      <p><Trans i18nKey="privacyPolicy.secondSection.paragraph1" /></p>
      <p><Trans i18nKey="privacyPolicy.secondSection.paragraph2" /></p>
      <p><Trans i18nKey="privacyPolicy.secondSection.paragraph3" /></p>
      <p><Trans i18nKey="privacyPolicy.secondSection.paragraph4" /></p>

      <h2 className="text-center text-2xl font-semibold w-full mt-4">{t("thirdSection.title")}</h2>
      <p>{t("thirdSection.paragraph1")}</p>

      <h2 className="text-center text-2xl font-semibold w-full mt-4">{t("fourthSection.title")}</h2>
      <p>{t("fourthSection.paragraph1")}</p>

      <h2 className="text-center text-2xl font-semibold w-full mt-4">{t("fifthSection.title")}</h2>
      <p>{t("fifthSection.paragraph1")}</p>

      <h2 className="text-center text-2xl font-semibold w-full mt-4">{t("sixthSection.title")}</h2>
      <p>{t("sixthSection.paragraph1")}</p>

      <h2 className="text-center text-2xl font-semibold w-full mt-4">{t("seventhSection.title")}</h2>
      <p><Trans i18nKey="privacyPolicy.seventhSection.paragraph1"
            components={{ mailto: <a href="mailto:info@zdielaj.si" /> }}
          />
      </p>
    </div>
  );
}

export default PrivacyPolicy;
