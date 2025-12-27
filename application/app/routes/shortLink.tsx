import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router';
import { getShortLink } from '../api/shortlinks';
import logger from '../logger';

export default function ShortLink() {
  const { t } = useTranslation('', { keyPrefix: 'routes' });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const shortLink = await getShortLink(params.path as string);

      logger.debug('Short link', shortLink);

      const albumId = shortLink.album.id;
      navigate(`/${t('prefix')}${t('album', { keyPrefix: 'routes' }).replace(':id', albumId)}`);
    };

    fetchData();
  }, [location.pathname]);

  return null;
}
