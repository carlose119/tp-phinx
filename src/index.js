// Dependencies
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import firebase from 'firebase';

// Routes
import AppRoutes from './routes';

// Assets
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

firebase.initializeApp({
  apiKey: "AIzaSyCqdWPA-nYWuzgcdS8bgUMzy-ZK420vZPY",
  authDomain: "tp-phinx.firebaseapp.com",
  databaseURL: "https://tp-phinx.firebaseio.com",
  projectId: "tp-phinx",
  storageBucket: "tp-phinx.appspot.com",
  messagingSenderId: "337292913904",
  appId: "1:337292913904:web:a2d4b4fe0bade509"
});

render(
  <Router>
    <AppRoutes />
  </Router>,
  document.getElementById('root')
);
  
