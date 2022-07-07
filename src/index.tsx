import React from 'react';
import ReactDOM from 'react-dom/client';
import { createGlobalStyle } from 'styled-components';
import App from './App';

const Global = createGlobalStyle`
  body {
    margin: 0;
  }

  * {
    box-sizing: border-box;
    list-style: none;
  }

  #root {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ul {
    margin: 0;
    padding: 0;
  }
`;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Global />
    <App />
  </React.StrictMode>
);
