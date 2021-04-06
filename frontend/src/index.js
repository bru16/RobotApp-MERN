import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ProvideAuth } from './context/authContext'
import Modal from 'react-modal';
Modal.setAppElement('#root');
ReactDOM.render(
  <ProvideAuth>
    <App />
  </ProvideAuth>,
  document.getElementById('root')
);