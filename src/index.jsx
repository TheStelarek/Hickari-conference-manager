import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'pages';
import 'assets/styles/fonts.css';
import AppProviders from './providers/AppProviders';

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <Root />
    </AppProviders>
  </React.StrictMode>,
  document.getElementById('root')
);
