import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./pages/login/index.css";
import App from './App'
import "./pages/Header/Header.css";
import store from "./store/index.js";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
