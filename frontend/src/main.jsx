import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Bootstrap JS
import App from './App';
import './index.css'; // Optional custom styles
import '@fortawesome/fontawesome-free/css/all.min.css'; // FontAwesome icons

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
