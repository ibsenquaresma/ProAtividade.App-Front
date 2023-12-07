import React from 'react';
import { createRoot } from 'react-dom/client';import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import Menu from './components/Menu';
import 'bootswatch/dist/cosmo/bootstrap.css';
import { BrowserRouter as Router } from 'react-router-dom';


const root = createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Menu/>
    <div className="container">
      <App />
    </div>
  </Router>
  
);
