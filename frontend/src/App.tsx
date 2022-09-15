import React from 'react';
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
import { AuthProvider } from './utils/useAuth';
import './App.css';

const App: React.FC = () => (
  <BrowserRouter>
    <AuthProvider>
      <>
        <Menu />
        <main role="main" className="flex-shrink-0 main-container" style={{ marginTop: 25, marginBottom: 25 }}>
          <Routes>
            <Route path="/o-aplikacii" element={<About />} />
            <Route path="/album/:id" element={<Album />} />
            <Route path="/registracia" element={<Register />} />
            <Route path="/validacia" element={<Validation />} />
            <Route path="/prihlasit-sa" element={<Login />} />
            <Route path="/notifikacie" element={<Notifications />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
