import React from 'react';
import Navbar from '../components/Navbar';
import SubNav from '../components/SubNav';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
const Error = () => {
    return (
        <div>
            <div className="bg-white mt-30 mb-20">
                <h1 className="text-center text-[40px] font-medium">
                    ERROR 404
                </h1>
                <p className="text-center">
                    ¡Ups! La página que buscabas no existe
                </p>
                <div className="flex justify-center">
                    <Link
                        to="/"
                        className=" text-white text-center p-2 rounded-[9px] mt-5 w-30 bg-[#2b2b7b] hover:bg-[#ff2ed4] transition-all"
                    >
                        Volver
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Error;
