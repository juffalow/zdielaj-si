import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Album from './pages/Album';
import './App.css';

const App = () => (
  <Router>
    <>
      <Menu />
      <main role="main" className="flex-shrink-0" style={{ marginTop: 25, marginBottom: 25 }}>
        <Route path="/o-aplikacii" component={About} />
        <Route path="/album/:id" component={Album} />
        <Route path="/" component={Home} exact />
      </main>
      <Footer />
    </>
  </Router>
);

export default App;
