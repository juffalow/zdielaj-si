import { useState, useCallback, useEffect, useTransition } from 'react';
import { Link, useNavigate } from 'react-router';
import type { Route } from './+types/home';
import { Card, CardHeader, CardBody, CardFooter, Button } from '@heroui/react';
import { Trans, useTranslation } from 'react-i18next';
import { useDropzone, type FileRejection } from 'react-dropzone';
import useAuth from '../utils/useAuth';
import useUpload from '../utils/useUpload';
import logger from '../logger';
import { createAlbum, createUserAlbum, addFilesToAlbum, addFilesToUserAlbum, deleteUserAlbum } from '../api/album';

export function meta({ location }: Route.MetaArgs) {
  const language = location.pathname.split('/')[1];

  return [
    { title: "Zdielaj.si" },
    (language === 'en' && { name: "description", content: "Do you also have a problem that some applications reduce the quality of your photos and videos? Here you can share them without any problems in full quality!" }),
    (language === 'sk' && { name: "description", content: "Máte problém, že niektoré aplikácie snížujú kvalitu vašich fotiek a videí? Tu ich môžete bezproblémov zdieľať v plnej kvalite!" }),
    (language === 'cz' && { name: "description", content: "Také máš problém, že ti některé aplikace snižují kvalitu fotek a videí? Tady je můžeš sdílet bez problémů v plné kvalitě!" }),
    (language === 'de' && { name: "description", content: "Haben Sie auch das Problem, dass einige Anwendungen die Qualität Ihrer Fotos und Videos reduzieren? Hier können Sie sie problemlos in voller Qualität teilen!" }),
    (language === 'es' && { name: "description", content: "¿Tienes problemas con que algunas aplicaciones reduzcan la calidad de tus fotos y videos? Aquí puedes compartirlos sin problemas en calidad completa!" }),
    (language === 'fr' && { name: "description", content: "Vous avez également un problème que certaines applications réduisent la qualité de vos photos et vidéos? Voici comment les partager sans problèmes en qualité complète!" }),
    (language === 'it' && { name: "description", content: "Hai problemi con alcune applicazioni che riducono la qualità delle tue foto e video? Qui puoi condividerli senza problemi in qualità completa!" }),
    (language === 'pl' && { name: "description", content: "Masz problem, że niektóre aplikacje obniżają jakość Twoich zdjęć i filmów? Tutaj możesz je udostępnić bez żadnych problemów w pełnej jakości!" }),
    (language === 'nl' && { name: "description", content: "Hebt u ook het probleem dat sommige toepassingen de kwaliteit van uw foto's en video's verlagen? Hier kunt u ze probleemloos in volledige kwaliteit delen!" }),
    (language === 'si' && { name: "description", content: "Imate težave, da nekatere aplikacije zmanjšujejo kakovost vaših foto in video? Tukaj jih lahko delite brez težav v celotni kakovosti!" }),
    (language === 'fi' && { name: "description", content: "Onko sinilkojalla, että joitakin sovelluksia vähentävät kuvan ja videon laatua? Voit jakaa ne ilman ongelmia täysikokoisella laadulla!" }),
    (language === 'se' && { name: "description", content: "Har du problem att vissa apparater minskar kvalitén på dina foton och videor? Här kan du dela dem utan problem i full kvalitet!" }),
    (language === 'no' && { name: "description", content: "Har du problem med at noen applikasjoner reduserer kvaliteten på dine bilder og videoer? Her kan du dele dem uten problemer i full kvalitet!" }),
    (language === 'dk' && { name: "description", content: "Har du problem med at nogle applikationer reducerer kvaliteten på dine billeder og videoer? Her kan du dele dem uden problemer i fuld kvalitet!" }),
    (language === 'hu' && { name: "description", content: "Van probléma, hogy néhány alkalmazás csökkenti a fényképek és videók minőségét? Itt tudod megosztani őket problém nélkül teljes minőségben!" }),
  ];
}

export function links() {
  return [
    { rel: "alternate", href: "https://zdielaj.si/en", hrefLang: "en" },
    { rel: "alternate", href: "https://zdielaj.si/sk", hrefLang: "sk" },
    { rel: "alternate", href: "https://zdielaj.si/cz", hrefLang: "cs" },
    { rel: "alternate", href: "https://zdielaj.si/de", hrefLang: "de" },
    { rel: "alternate", href: "https://zdielaj.si/es", hrefLang: "es" },
    { rel: "alternate", href: "https://zdielaj.si/fr", hrefLang: "fr" },
    { rel: "alternate", href: "https://zdielaj.si/it", hrefLang: "it" },
    { rel: "alternate", href: "https://zdielaj.si/pl", hrefLang: "pl" },
    { rel: "alternate", href: "https://zdielaj.si/nl", hrefLang: "nl" },
    { rel: "alternate", href: "https://zdielaj.si/si", hrefLang: "si" },
    { rel: "alternate", href: "https://zdielaj.si/fi", hrefLang: "fi" },
    { rel: "alternate", href: "https://zdielaj.si/se", hrefLang: "se" },
    { rel: "alternate", href: "https://zdielaj.si/no", hrefLang: "no" },
    { rel: "alternate", href: "https://zdielaj.si/dk", hrefLang: "da" },
    { rel: "alternate", href: "https://zdielaj.si/hu", hrefLang: "hu" },
  ];
}

export default function Home() {
  const { t } = useTranslation('', { keyPrefix: 'home' });
  const navigate = useNavigate();
  const { user } = useAuth();
  const { clear, uploadFiles, rejectedFiles, stashFiles } = useUpload();
  const [ album, setAlbum ] = useState<Album | null>(null);
  const [ _, startTransition ] = useTransition();

  const onDrop = useCallback(async (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (album === null) {
      return;
    }

    stashFiles(acceptedFiles);

    if (fileRejections.length > 0) {
      rejectedFiles(fileRejections);
    }

    setTimeout(async () => {
      const { files } = user === null ?
        await addFilesToAlbum(album.id, album.token, acceptedFiles.map((file) => ({ name: file.name, mimetype: file.type, size: file.size })))
        : await addFilesToUserAlbum(album.id, acceptedFiles.map((file) => ({ name: file.name, mimetype: file.type, size: file.size })));

      logger.info('Files added to album', album, files);
      
      uploadFiles(acceptedFiles, files.map((f: any) => ({ url: f.url as string, fields: f.fields })));
    }, 1);
  
    navigate(`/${t("prefix", { keyPrefix: "routes" })}${t("album", { keyPrefix: "routes" }).replace(':id', album.id)}`, { state: { album, isNew: true } });    
  }, [album, user, uploadFiles, navigate]);

  const {
    getRootProps,
    getInputProps,
    open,
  } = useDropzone({
    onDrop,
    onFileDialogOpen: () => startTransition(async () => {
      logger.debug('File dialog open, creating album...');

      const album = await (user === null ?
        createAlbum([])
        : createUserAlbum([]));

      startTransition(() => {
        setAlbum(album);
      });
    }),
    onFileDialogCancel: async () => {
      logger.debug('File dialog cancel, deleting album...');

      if (album === null) {
        return;
      }

      await deleteUserAlbum(album.id);

      setAlbum(null);
    },
    accept: user === null ? {
      'image/*': [],
    } : {
      'image/*': [],
      'video/*': [],
    },
    maxFiles: user === null ? 10 : 50,
    maxSize: user === null ? 1024 * 1024 * 10 : undefined,
  });

  useEffect(() => {
    clear();
  }, []);

  return (
    <div>
      <h1 className="text-center text-5xl font-bold">{t("title")}</h1>
      <p className="text-center text-gray-500 mt-3 text-xl">{t("subtitle")}</p>

      <div className="mt-5 p-8">
        <div {...getRootProps()} className="rounded-xl text-center" style={{ border: '1px #28a745 dashed', padding: '40px' }} data-tracking-id="home_upload_area_click">
          <input {...getInputProps()} aria-label="upload files" />
          <p>{t("uploadArea.title")}</p>
          <Button className="mt-5" color="success" variant="solid" size="lg" data-tracking-id="home_upload_button_click" onPress={open}>{t("uploadArea.button")}</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-10">
        <Card shadow="sm" fullWidth={true}>
          <CardHeader className="bg-blue-100">
            <h2 className="text-center text-2xl font-semibold w-full">{t("pricing.default.title")}</h2>
          </CardHeader>
          <CardBody className="px-8">
            <p className="text-center text-3xl">0€ / <small className="text-gray-500">{t("pricing.default.monthly")}</small></p>
            <ul className="list-inside features-list mt-4">
              <li><Trans i18nKey="home.pricing.default.maxTenPhotos" components={{ small: <small className="text-gray-500" /> }} /></li>
              <li><Trans i18nKey="home.pricing.default.maxSizePerFile" components={{ small: <small className="text-gray-500" /> }} /></li>
              <li><Trans i18nKey="home.pricing.default.deletedAfter24Hours" components={{ small: <small className="text-gray-500" /> }} /></li>
            </ul>
          </CardBody>
        </Card>
        <Card>
          <CardHeader className="bg-blue-300">
            <h2 className="text-center text-2xl font-semibold w-full">{t("pricing.standard.title")}</h2>
          </CardHeader>
          <CardBody className="px-8">
            <p className="text-center text-3xl">1.99€ / <small className="text-gray-500">{t("pricing.standard.monthly")}</small></p>
            <ul className="list-inside features-list mt-4">
              <li><Trans i18nKey="home.pricing.standard.maxTenGB"  components={{ small: <small className="text-gray-500" /> }} /></li>
              <li><Trans i18nKey="home.pricing.standard.maxSizePerFile"  components={{ small: <small className="text-gray-500" /> }} /></li>
              <li>{t("pricing.standard.video")}</li>
              <li>{t("pricing.standard.listOfAlbums")}</li>
              <li>{t("pricing.standard.publicProfile")}</li>
              <li>{t("pricing.standard.mfa")}</li>
              <li><Trans i18nKey="home.pricing.standard.filesAreNotDeleted" /></li>
            </ul>
          </CardBody>
          <CardFooter>
          <Button as={Link} to={`/${t("prefix", { keyPrefix: "routes" })}${t("signUp", { keyPrefix: "routes" })}`} variant="bordered" fullWidth={true} data-tracking-id="home_standard_sign_up_click">{t("pricing.standard.signUp")}</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="bg-blue-200">
            <h2 className="text-center text-2xl font-semibold w-full">{t("pricing.free.title")}</h2>
          </CardHeader>
          <CardBody className="px-8">
            <p className="text-center text-3xl">0€ / <small className="text-gray-500">{t("pricing.free.monthly")}</small></p>
            <ul className="list-inside features-list mt-4">
              <li><Trans i18nKey="home.pricing.free.maxOneGB" components={{ small: <small className="text-gray-500" /> }} /></li>
              <li><Trans i18nKey="home.pricing.free.maxSizePerFile" components={{ small: <small className="text-gray-500" /> }} /></li>
              <li>{t("pricing.free.video")}</li>
              <li>{t("pricing.free.listOfAlbums")}</li>
              <li><Trans i18nKey="home.pricing.free.filesWillBeDeletedAfter7Days" /></li>
            </ul>
          </CardBody>
          <CardFooter>
            <Button as={Link} to={`/${t("prefix", { keyPrefix: "routes" })}${t("signUp", { keyPrefix: "routes" })}`} variant="bordered" fullWidth={true} data-tracking-id="home_free_sign_up_click">{t("pricing.free.signUp")}</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
