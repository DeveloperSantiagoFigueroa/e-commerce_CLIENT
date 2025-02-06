import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import Navbar from './components/Navbar'
import 'bootstrap-icons/font/bootstrap-icons.css';
import SubNav from './components/SubNav';
import Home from './pages/Home';
import Footer from './components/Footer';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navbar />
    <SubNav />
    <Home />
    <Footer />
  </StrictMode>,
)
