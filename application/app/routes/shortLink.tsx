import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router';
import { getShortLink } from '../api/shortlinks';
import logger from '../logger';
import { ROUTES } from '../constants';

export default function ShortLink() {
  const { i18n } = useTranslation();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const shortLink = await getShortLink(params.path as string);

      logger.debug('Short link', shortLink);

      const albumId = shortLink.album.id;
      navigate(`/${i18n.language}/${ROUTES[i18n.language as keyof typeof ROUTES].album.replace(':id', albumId)}`);
    };

    fetchData();
  }, [location.pathname]);

  return null;
}
