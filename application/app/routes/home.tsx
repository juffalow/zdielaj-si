import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import type { Route } from './+types/home';
import { Card, CardHeader, CardBody, CardFooter, Button } from '@heroui/react';
import { Trans, useTranslation } from 'react-i18next';
import { useDropzone } from 'react-dropzone';
import useAuth from '../utils/useAuth';
import useUpload from '../utils/useUpload';
import logger from '../logger';
import { createAlbum, createUserAlbum } from '../api/album';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const { t } = useTranslation('', { keyPrefix: 'home' });
  const navigate = useNavigate();
  const { user, refreshSession } = useAuth();

  const {
    clear,
    uploadFiles,
  } = useUpload();

  const onDrop = async (acceptedFiles: File[]) => {
    const album: Album = user === null ? 
      await createAlbum(acceptedFiles.map((file) => ({ name: file.name, mimetype: file.type, size: file.size })))
      : await createUserAlbum(acceptedFiles.map((file) => ({ name: file.name, mimetype: file.type, size: file.size })));

    logger.info('Album created', album);
    
    uploadFiles(acceptedFiles, album.files.map(f => f.uploadUrl as string));
  
    navigate(`/album/${album.id}`, { state: { album, isNew: true } });    
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.*'],
    }
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
          <p>Move photos here or select them by clicking</p>
          <Button className="mt-5" color="success" variant="ghost" data-tracking-id="home_upload_button_click">Upload files</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-10">
        <Card shadow="sm" fullWidth={true}>
          <CardHeader className="bg-blue-100">
            <h2 className="text-center text-2xl font-semibold w-full">{t("pricing.default.title")}</h2>
          </CardHeader>
          <CardBody className="px-8">
            <p className="text-center text-3xl">0€ / <small className="text-gray-500">{t("pricing.default.monthly")}</small></p>
            <ul className="list-disc list-inside">
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
            <ul className="list-disc list-inside">
              <li><Trans i18nKey="home.pricing.standard.maxTenGB"  components={{ small: <small className="text-gray-500" /> }} /></li>
              <li><Trans i18nKey="home.pricing.standard.maxSizePerFile"  components={{ small: <small className="text-gray-500" /> }} /></li>
              <li>{t("pricing.standard.video")}</li>
              <li>{t("pricing.standard.listOfAlbums")}</li>
              <li>{t("pricing.standard.publicProfile")}</li>
              <li><Trans i18nKey="home.pricing.standard.filesAreNotDeleted" /></li>
            </ul>
          </CardBody>
          <CardFooter>
          <Button as={Link} to={`/${t("prefix", { keyPrefix: "routes" })}${t("signUp", { keyPrefix: "routes" })}`} variant="bordered" fullWidth={true}>Sign up</Button>
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
            <ul className="list-disc list-inside">
              <li><Trans i18nKey="home.pricing.free.maxOneGB" components={{ small: <small className="text-gray-500" /> }} /></li>
              <li><Trans i18nKey="home.pricing.free.maxSizePerFile" components={{ small: <small className="text-gray-500" /> }} /></li>
              <li>{t("pricing.free.video")}</li>
              <li>{t("pricing.free.listOfAlbums")}</li>
              <li><Trans i18nKey="home.pricing.free.filesWillBeDeletedAfter7Days" /></li>
            </ul>
          </CardBody>
          <CardFooter>
            <Button as={Link} to={`/${t("prefix", { keyPrefix: "routes" })}${t("signUp", { keyPrefix: "routes" })}`} variant="bordered" fullWidth={true}>Sign up</Button>
          </CardFooter>
        </Card>
      </div>
      <div className="mt-10">
        <h2 className="text-center text-2xl font-bold w-full">Features</h2>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-5">
        <div>
          <h2 className="text-center text-xl font-semibold w-full">Based in EU</h2>
          <p>Sensitive user information as well as all their data are stored in the EU, specifically in Frankfurt (Germany).</p>
        </div>
        <div>
          <h2 className="text-center text-xl font-semibold w-full">High availability</h2>
          <p>The application is designed to minimize or hide the effects of individual component failures, ensuring continuous operation with minimal downtime.</p>
        </div>
        <div>
          <h2 className="text-center text-xl font-semibold w-full">Encryption</h2>
          <p>All data is stored and transmitted in encrypted form, protecting it from unauthorized access or modification.</p>
        </div>
      </div>
    </div>
  )
}
