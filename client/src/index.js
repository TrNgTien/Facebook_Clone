import React from 'react';
import ReactDOM from 'react-dom';
import MainRoutes from './app/routes/MainRoutes.js';
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <MainRoutes/>
  </React.StrictMode>,
  document.getElementById('root')
);

