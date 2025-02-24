import type { FunctionComponent } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
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
              <Route path="/o-aplikacii" element={<About />} />
              <Route path="/zasady-ochrany-osobnych-udajov" element={<PrivacyPolicy />} />
              <Route path="/album/:id" element={<Album />} />
              <Route path="/albumy" element={<RequireAuth><Albums /></RequireAuth>} />
              <Route path="/registracia" element={<Register />} />
              <Route path="/prihlasit-sa" element={<Login />} />
              <Route path="/reset-hesla" element={<PasswordReset />} />
              <Route path="/notifikacie" element={<Notifications />} />
              <Route path="/predplatne" element={<RequireAuth><Subscription /></RequireAuth>} />
              <Route path="/profil" element={<RequireAuth><Profile /></RequireAuth>} />
              <Route path="/profil/:id" element={<PublicProfile />} />
              <Route path="/:path" element={<ShortLinkRedirect />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </main>
          <Footer />

          <Tracking />
        </>
      </UploadProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
