import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getShortLink } from '../api/shortlinks';

export default function ShortLinkRedirect() {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const shortLink: any = await getShortLink(params.path as string);
      const albumId = shortLink.albumId || shortLink.album.id;
      navigate(`/album/${albumId}`);
    };

    fetchData();
  }, [location.pathname]);

  return null;
}
