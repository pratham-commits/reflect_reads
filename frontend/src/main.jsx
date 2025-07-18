import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import store from "./store/index.js"
import './index.css'
import App from './App.jsx'
import { BrowserRouter as Router } from 'react-router-dom'
import {Provider} from "react-redux"


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Provider store={store}>
      <App />

      </Provider>
    
    </Router>
    
  </StrictMode>,
)
