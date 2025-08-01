import { use } from 'react';
import {
  Card,
  CardBody,
  CardFooter,
  Image,
} from '@heroui/react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { formatDate } from '../../utils/functions';

export default function PublicProfileAlbums({ fetchAlbums }: { fetchAlbums: Promise<Album[]> }) {
  const albums = use(fetchAlbums);
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-4 gap-4">
      {
        albums.map(album => (
          <Card key={album.id} isPressable={true} as={Link} to={`/${t("routes.prefix")}${t("routes.album").replace(":id", album.id)}`}>
            <CardBody className="overflow-visible p-0">
              <Image
                alt="Card background"
                className="object-cover w-full rounded-xl rounded-b-none"
                src={album.media[0].thumbnails[0]}
              />
            </CardBody>
            <CardFooter className="text-small">
              <h4 className="font-bold text-large">{album.name}</h4>
              <p className="text-default-500">{formatDate(album.createdAt, 'dd. MM. YYYY, HH:mm')}</p>
            </CardFooter>
          </Card>
        ))
      }
    </div>
  );
}
