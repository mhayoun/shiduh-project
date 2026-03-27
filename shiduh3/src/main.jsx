import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

// Remplace 'TON_CLIENT_ID_ICI' par ton ID Google Cloud Console
const GOOGLE_CLIENT_ID = "995700588872-h2ilo4tkl1s3154fper2m8cgm7n5shuf.apps.googleusercontent.com"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>,
)