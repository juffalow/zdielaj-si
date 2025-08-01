import { use } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FaHome,
  FaFacebook,
  FaInstagram,
  FaStrava,
  FaPinterest,
} from 'react-icons/fa';

const Info = ({ publicProfilePromise }: { publicProfilePromise: Promise<PublicProfile> }) => {
  const { t } = useTranslation();
  const publicProfile = use(publicProfilePromise);

  return (
    <div>
      <h1 className="text-center mb-2 text-5xl w-full">{publicProfile.name}</h1>
      <p className="text-center" style={{ fontSize: '2rem' }}>
        {
          publicProfile.contact?.homepage && (
            <a href={publicProfile.contact.homepage} className="ms-2 me-2" style={{ color: '#000' }}><FaHome className="inline-block" /></a>
          )
        }
        {
          publicProfile.contact?.facebook && (
            <a href={publicProfile.contact.facebook} className="ms-2 me-2" style={{ color: '#000' }}><FaFacebook className="inline-block" /></a>
          )
        }
        {
          publicProfile.contact?.instagram && (
            <a href={publicProfile.contact.instagram} className="ms-2 me-2" style={{ color: '#000' }}><FaInstagram className="inline-block" /></a>
          )
        }
        {
          publicProfile.contact?.pinterest && (
            <a href={publicProfile.contact.pinterest} className="ms-2 me-2" style={{ color: '#000' }}><FaPinterest className="inline-block" /></a>
          )
        }
        {
          publicProfile.contact?.strava && (
            <a href={publicProfile.contact.strava} className="ms-2 me-2" style={{ color: '#000' }}><FaStrava className="inline-block" /></a>
          )
        }
      </p>
      <p className="text-center mt-2 mb-2 text-lg w-full">{publicProfile.description}</p>
    </div>
  );
}

export default Info;
