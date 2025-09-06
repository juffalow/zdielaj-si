import { useState, useCallback, useEffect, useTransition } from 'react';
import { Link, useNavigate } from 'react-router';
import type { Route } from './+types/home';
import { Card, CardHeader, CardBody, CardFooter, Button } from '@heroui/react';
import { Trans, useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import useAuth from '../utils/useAuth';
import useUpload from '../utils/useUpload';
import logger from '../logger';
import { createAlbum, createUserAlbum, addFilesToAlbum, addFilesToUserAlbum, deleteUserAlbum } from '../api/album';

export function meta({}: Route.MetaArgs) {
  const { t } = useTranslation('', { keyPrefix: 'meta.home' });

  return [
    { title: "Zdielaj.si" },
    { name: "description", content: t("description") },
  ];
}

export function links() {
  return [
    { rel: "alternate", href: "https://zdielaj.si/en", hrefLang: "en" },
    { rel: "alternate", href: "https://zdielaj.si/sk", hrefLang: "sk" },
    { rel: "alternate", href: "https://zdielaj.si/cz", hrefLang: "cz" },
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
    { rel: "alternate", href: "https://zdielaj.si/dk", hrefLang: "dk" },
    { rel: "alternate", href: "https://zdielaj.si/hu", hrefLang: "hu" },
  ];
}

export default function Home() {
  const { t } = useTranslation('', { keyPrefix: 'home' });
  const navigate = useNavigate();
  const { user } = useAuth();
  const { clear, uploadFiles } = useUpload();
  const [ album, setAlbum ] = useState<Album | null>(null);
  const [ _, startTransition ] = useTransition();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (album === null) {
      return;
    }

    setTimeout(async () => {
      const { files } = user === null ?
        await addFilesToAlbum(album.id, album.token, acceptedFiles.map((file) => ({ name: file.name, mimetype: file.type, size: file.size })))
        : await addFilesToUserAlbum(album.id, acceptedFiles.map((file) => ({ name: file.name, mimetype: file.type, size: file.size })));

      logger.info('Album created', album);
      
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
          <input {...getInputProps()} />
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
            <ul className="list-inside features-list">
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
          <CardBody>
            <p className="text-center text-3xl">1.99€ / <small className="text-gray-500">{t("pricing.standard.monthly")}</small></p>
          </CardBody>
          <CardBody className="px-8">
            <ul className="list-inside features-list">
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
          <Button as={Link} to={`/${t("prefix", { keyPrefix: "routes" })}${t("signUp", { keyPrefix: "routes" })}`} variant="bordered" fullWidth={true} data-tracking-id="home_standard_sign_up_click">Sign up</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader className="bg-blue-200">
            <h2 className="text-center text-2xl font-semibold w-full">{t("pricing.free.title")}</h2>
          </CardHeader>
          <CardBody>
            <p className="text-center text-3xl">0€ / <small className="text-gray-500">{t("pricing.free.monthly")}</small></p>
          </CardBody>
          <CardBody className="px-8">
            <ul className="list-inside features-list">
              <li><Trans i18nKey="home.pricing.free.maxOneGB" components={{ small: <small className="text-gray-500" /> }} /></li>
              <li><Trans i18nKey="home.pricing.free.maxSizePerFile" components={{ small: <small className="text-gray-500" /> }} /></li>
              <li>{t("pricing.free.video")}</li>
              <li>{t("pricing.free.listOfAlbums")}</li>
              <li><Trans i18nKey="home.pricing.free.filesWillBeDeletedAfter7Days" /></li>
            </ul>
          </CardBody>
          <CardFooter>
            <Button as={Link} to={`/${t("prefix", { keyPrefix: "routes" })}${t("signUp", { keyPrefix: "routes" })}`} variant="bordered" fullWidth={true} data-tracking-id="home_free_sign_up_click">Sign up</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
