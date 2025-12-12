import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import JangBiseo from './JangBiseo';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);

// Simple routing based on pathname
const path = window.location.pathname;

if (path === '/jang-biseo') {
  root.render(
    <React.StrictMode>
      <JangBiseo />
    </React.StrictMode>
  );
} else {
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}