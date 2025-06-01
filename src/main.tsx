import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';  // ✅ correcto

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
export default App;
