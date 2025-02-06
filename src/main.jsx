import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import Navbar from './components/Navbar'
import 'bootstrap-icons/font/bootstrap-icons.css';
import SubNav from './components/SubNav';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <SubNav />
  </StrictMode>,
)
