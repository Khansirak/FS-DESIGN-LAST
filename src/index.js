
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import ReactFlow, { ReactFlowProvider } from 'reactflow';

import './index.css';
import App from './App';
import { ZustandProvider, useStore } from 'zustand';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ReactFlowProvider>
        <App />
    </ReactFlowProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
