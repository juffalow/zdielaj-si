import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getShortLink } from '../api/services';

export default function ShortLinkRedirect() {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const shortLink: any = await getShortLink(params.path as string);
      navigate(`/album/${shortLink.albumId}`);
    };

    fetchData();
  }, [location.pathname]);

  return null;
}
