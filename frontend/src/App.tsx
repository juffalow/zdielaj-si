import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Album from './pages/Album';
import Register from './pages/Register';
import Validation from './pages/Validation';
import Login from './pages/Login';
import Notifications from './pages/Notifications';
import { setUserToken, refreshUserToken, getUserToken } from './api/token';
import './App.css';

const App: React.FC = () => {
  const [ isLogged, setIsLogged ] = useState<boolean>(false);

  const onLogin = (response: { id: string; expiresAt: string; token: string; }) => {
    setUserToken(response);
    setIsLogged(true);
  }

  const onLogout = () => {
    setUserToken({ id: '', expiresAt: '', token: null });
    setIsLogged(false);
  }

  useEffect(() => {
    async function loadUserToken() {
      await refreshUserToken();
      setIsLogged(getUserToken() !== null);
    }
    loadUserToken();
  }, [])

  return (
    <BrowserRouter>
      <>
        <Menu isLogged={isLogged} onLogout={onLogout} />
        <main role="main" className="flex-shrink-0 main-container" style={{ marginTop: 25, marginBottom: 25 }}>
          <Routes>
            <Route path="/o-aplikacii" element={<About />} />
            <Route path="/album/:id" element={<Album />} />
            <Route path="/registracia" element={<Register />} />
            <Route path="/validacia" element={<Validation />} />
            <Route path="/prihlasit-sa" element={<Login onSuccess={onLogin} />} />
            <Route path="/notifikacie" element={<Notifications />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </>
    </BrowserRouter>
  );
}

export default App;
