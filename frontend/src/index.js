import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ProvideAuth } from './context/authContext'
import Modal from 'react-modal';
import { BrowserRouter as Router } from "react-router-dom";
Modal.setAppElement('#root');
ReactDOM.render(
  <Router>
    <ProvideAuth>
      <App />
    </ProvideAuth>
  </Router>,
  document.getElementById('root')
);