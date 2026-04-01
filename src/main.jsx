import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { TrainProvider } from './context/TrainContext'
import App from './App'
import './index.css'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TrainProvider>
          <App />
        </TrainProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
