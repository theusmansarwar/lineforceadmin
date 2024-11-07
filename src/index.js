import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom';
import AppWrapper from './Appwraper';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
 
  <BrowserRouter basename="/admin">
   
      <AppWrapper />
  
  </BrowserRouter>

);
