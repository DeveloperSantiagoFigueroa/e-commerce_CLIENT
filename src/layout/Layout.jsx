import React from 'react'
import Navbar from '../components/Navbar'
import SubNav from '../components/SubNav'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
        <Navbar />
        <SubNav />
        <Outlet />
        
    </div>
  )
}

export default Layout