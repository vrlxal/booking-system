import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppWrapper from './App';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <AppWrapper />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);
