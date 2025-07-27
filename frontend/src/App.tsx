import type { FunctionComponent } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import { useTranslation } from 'react-i18next';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import UserDataDeletion from './pages/UserDataDeletion';
import Album from './pages/Album';
import Albums from './pages/Albums';
import Register from './pages/Register';
import Login from './pages/Login';
import PasswordReset from './pages/PasswordReset';
import Notifications from './pages/Notifications';
import Subscription from './pages/Subscription';
import Profile from './pages/Profile';
import PublicProfile from './pages/PublicProfile';
import ShortLinkRedirect from './pages/ShortLink';
import { AuthProvider, RequireAuth } from './utils/useAuth';
import { UploadProvider } from './utils/useUpload';
import Tracking from './utils/Tracking';
import './App.css';

const App: FunctionComponent = () => (
  <BrowserRouter>
    <AuthProvider>
      <UploadProvider>
        <>
          <Menu />
          <main role="main" className="flex-shrink-0 main-container pt-5 pb-5">
            <Routes>
              {appRoutes()}
              <Route path="en/">
                {appRoutes('en')}
              </Route>
              <Route path="cz/">
                {appRoutes('cz')}
              </Route>
              <Route path="de/">
                {appRoutes('de')}
              </Route>
              <Route path="es/">
                {appRoutes('se')}
              </Route>
              <Route path="fr/">
                {appRoutes('fr')}
              </Route>
              <Route path="fi/">
                {appRoutes('fi')}
              </Route>
              <Route path="se/">
                {appRoutes('se')}
              </Route>
              <Route path="no/">
                {appRoutes('no')}
              </Route>
              <Route path="it/">
                {appRoutes('it')}
              </Route>

            </Routes>
          </main>
          <Footer />

          <Tracking />
        </>
      </UploadProvider>
    </AuthProvider>
  </BrowserRouter>
);

const appRoutes = (lang = 'sk') => {
  const { t } = useTranslation('', { keyPrefix: 'routes', lng: lang });

  return [
    <Route path={t('privacyPolicy')} element={<PrivacyPolicy />} />,
    <Route path={t('userData')} element={<UserDataDeletion />} />,
    <Route path={t('album')} element={<Album />} />,
    <Route path={t('albums')} element={<RequireAuth><Albums /></RequireAuth>} />,
    <Route path={t('signUp')} element={<Register />} />,
    <Route path={t('signIn')} element={<Login />} />,
    <Route path={t('passwordReset')} element={<PasswordReset />} />,
    <Route path="notifikacie" element={<Notifications />} />,
    <Route path="predplatne" element={<RequireAuth><Subscription /></RequireAuth>} />,
    <Route path={t('userProfile')} element={<RequireAuth><Profile /></RequireAuth>} />,
    <Route path={t('publicProfile')} element={<PublicProfile />} />,
    <Route path=":path" element={<ShortLinkRedirect />} />,
    <Route element={<Home />} index />,
  ]
};

export default App;
