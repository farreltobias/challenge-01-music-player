import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app.tsx'
import './global.css'
import { IconContext } from '@phosphor-icons/react'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <IconContext.Provider value={{ weight: 'fill', size: 32 }}>
      <App />
    </IconContext.Provider>
  </React.StrictMode>
)
