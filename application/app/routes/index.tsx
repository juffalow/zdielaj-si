import { Navigate } from 'react-router';
import detector from 'i18next-browser-languagedetector';

export default function Index() {
  const languageDetector = new detector(null, {});

  const lang = languageDetector.detect();
  
  return <Navigate to={`/${lang}`} />;
}
