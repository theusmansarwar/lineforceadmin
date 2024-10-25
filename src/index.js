import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppWrapper from './Appwraper';

ReactDOM.render(
  <BrowserRouter basename="/admin">
    <AppWrapper />
  </BrowserRouter>,
  document.getElementById('root')
);
