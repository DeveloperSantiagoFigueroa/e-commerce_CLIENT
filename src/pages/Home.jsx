import React from 'react'
import Logo from '../images/Home.png'
const Home = () => {
  return (
    <div>
        <div className='bg-gradient-to-b from-[#1b1b51] to-[#ff2ad9] flex justify-center'>
            <img src={Logo} className='w-screen py-1 md:w-[650px]' />
        </div>
    </div>
  )
}

export default Home