import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./pages/login/index.css";
import App from './App'
import "./pages/system/index.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
