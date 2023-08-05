import React, { useState } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import logo from '../assets/logo.png';

import { NavLink, Link, useNavigate } from 'react-router-dom'

const Navbar = () => {
    const nav__links = [
        {
            path: '/home',
            display: 'Inicio'
        },
        {
            path: '/productos',
            display: 'Productos'
        },
        {
            path: '/sells',
            display: 'Ventas'
        },
        {
            path: '/register',
            display: 'Registrar producto'
        }
    ]

    const [nav, setNav] = useState(true);
    const [img, setImg] = useState(false);

    const handleNav = () => {
        setNav(!nav);
        setImg(!img);
    };

    return (
        <div className='bg-teal-500 h-16  text-white'>
            <div className='flex justify-between items-center h-full max-w-7xl mx-auto px-4'>
                <div className='flex items-center'>
                    {!img && (
                        <div>
                            <img src={logo} alt='logo' className='h-12 m-4' />
                        </div>
                    )}
                </div>
                <div className='flex-grow'>


                </div>
                <div className='flex items-center hidden md:flex'>
                    <ul className='flex space-x-4'>
                        {
                            nav__links.map((item, index) => (
                                <li className='nav__item' key={index}>
                                    <NavLink to={item.path} className={navClass => navClass.isActive ? 'active__link' : ''}>{item.display}</NavLink>
                                </li>
                            ))

                        }
                    </ul>
                </div>
                <div className='block md:hidden'>
                    {!nav ? (
                        <AiOutlineClose size={20} onClick={handleNav} />
                    ) : (
                        <AiOutlineMenu size={20} onClick={handleNav} />
                    )}
                </div>
            </div>
            <div className={!nav ? 'fixed left-0 top-0 w-[75%] h-full border-r border-[#4c6d3c] bg-teal-700 ease-in-out duration-500 bg-opacity-75' : 'fixed left-[-100%]'}>
                <div className='max-w-7xl mx-auto px-4 font-semibold'>
                    <div className='mt-8'>
                        <img src={logo} alt='logo' className='h-12 m-4' />
                    </div>
                    <ul className='uppercase p-4 text-white'>
                        {
                            nav__links.map((item, index) => (
                                <li className='nav__item' key={index}>
                                    <NavLink to={item.path} className={navClass => navClass.isActive ? 'active__link' : ''}>{item.display}</NavLink>
                                </li>
                            ))

                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
