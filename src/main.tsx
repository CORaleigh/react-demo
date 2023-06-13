import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { setAssetPath } from "@esri/calcite-components/dist/components";
setAssetPath(window.location.href);

import '@esri/calcite-components-react/dist/'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
