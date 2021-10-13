import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import MainRoutes from './app/routes/MainRoutes';
ReactDOM.render(
  <React.StrictMode>
    <MainRoutes />
  </React.StrictMode>,
  document.getElementById('root')
);

