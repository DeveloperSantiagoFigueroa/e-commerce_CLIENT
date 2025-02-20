import React from 'react';
import Logo from '../images/Home.webp';
import LogoDesktop from '../images/HomeDesktop.webp';
import Products from '../components/Products';
const Home = () => {
    return (
        <div>
            <div className="bg-gradient-to-b from-[#1b1b51] to-[#ff2ad9] flex justify-center">
                <img
                    src={Logo}
                    className="w-screen py-1 md:w-[650px] lg:hidden"
                />
                <img
                    src={LogoDesktop}
                    className="hidden lg:block w-screen py-1 lg:w-[650px]"
                />
            </div>
            <Products />
        </div>
    );
};

export default Home;
