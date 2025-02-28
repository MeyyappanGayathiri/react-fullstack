import {BrowserRouter} from 'react-router-dom'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import './index.css'
import UserProvider from './context/index.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <UserProvider>
  <App />
  </UserProvider>
   </BrowserRouter>,
)