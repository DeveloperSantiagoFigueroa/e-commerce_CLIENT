import React, { useState, useEffect, useRef } from 'react';
import Logo from '../images/LogoHeader.webp';

const Navbar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const searchRef = useRef(null);

    //TODO: Terminar esto
    const cartAmount = 0;
    const favouriteAmount = 0;

    const handleSearchClick = () => {
        if (!isExpanded) {
            setIsExpanded(true);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchRef.current &&
                !searchRef.current.contains(event.target)
            ) {
                setIsExpanded(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="bg-gradient-to-b from-[#2b2b7b] to-[#1b1b51] md:bg-none md:bg-[#2b2b7b] flex items-center justify-evenly md:justify-between md:px-15 lg:py-1 lg:justify-center lg:gap-8">
            <div className="left">
                <i className="bi bi-list text-white text-[45px] lg:hidden"></i>
                <img
                    src={Logo}
                    alt=""
                    className="hidden lg:block w-60 p-3 cursor-pointer"
                />
            </div>
            <div
                ref={searchRef}
                className={`p-1 overflow-hidden ${
                    isExpanded
                        ? 'w-[210px] md:w-[390px] lg:w-[450px] xl:w-[600px]'
                        : 'w-[40px] md:w-[320px] xl:w-[500px]'
                } h-[40px] bg-white shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300`}
                onClick={handleSearchClick}
            >
                <div>
                    <i className="bi bi-search text-center ml-2"></i>
                </div>
                <input
                    placeholder="Buscar"
                    type="text"
                    className="outline-none text-[15px] bg-transparent w-full text-black font-normal px-4"
                />
            </div>

            <div className="right flex gap-7 relative">
                <i className="hidden md:block bi bi-person-circle text-white text-[35px] cursor-pointer hover:text-[#ff2ed4] transition-all"></i>

                <div className="relative hidden md:block">
                    <p
                        className={`${
                            favouriteAmount > 0 ? '' : 'hidden'
                        } bg-white text-black text-center text-[14px] font-medium flex justify-center items-center w-5 h-5 rounded-full absolute right-5`}
                    >
                        {/* //TODO: Terminar esto */}
                        {favouriteAmount}
                    </p>
                    <i className="hidden md:block bi bi-heart text-white text-[35px] cursor-pointer hover:text-[#ff2ed4] transition-all"></i>
                </div>

                <div className="relative">
                    <p
                        className={`${
                            cartAmount > 0 ? '' : 'hidden'
                        } bg-white text-black text-center text-[14px] font-medium flex justify-center items-center w-5 h-5 rounded-full absolute right-5`}
                    >
                        {/* //TODO: Terminar esto */}
                        {cartAmount}
                    </p>
                    <i className="bi bi-cart text-white text-[35px] cursor-pointer hover:text-[#ff2ed4] transition-all"></i>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
