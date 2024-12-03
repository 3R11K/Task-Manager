import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';  // Adiciona BrowserRouter
import App from './App';  // O componente principal
import './index.css';  // Seus estilos globais (se houver)

console.log('Rendering index.js'); // Verifica se o index.js está sendo executado

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root') // Aponta para o DOM onde a app será montada
);
