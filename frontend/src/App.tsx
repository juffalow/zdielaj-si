import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Album from './pages/Album';
import Register from './pages/Register';
import Login from './pages/Login';
import './App.css';

const App: React.FC = () => {
  const [ isLogged, setIsLogged ] = useState<boolean>(localStorage.getItem('userToken') !== null);

  const onLogin = (user: User) => {
    localStorage.setItem('userToken', user.token);
    setIsLogged(true);
  }

  const onLogout = () => {
    localStorage.removeItem('userToken');
    setIsLogged(false);
  }

  return (
    <Router>
      <>
        <Menu isLogged={isLogged} onLogout={onLogout} />
        <main role="main" className="flex-shrink-0 main-container" style={{ marginTop: 25, marginBottom: 25 }}>
          <Route path="/o-aplikacii" component={About} />
          <Route path="/album/:id" component={Album} />
          <Route path="/registracia" component={Register} />
          <Route path="/prihlasit-sa" render={() => (
            <Login onSuccess={onLogin} />
          )} />
          <Route path="/" component={Home} exact />
        </main>
        <Footer />
      </>
    </Router>
  );
}

export default App;
