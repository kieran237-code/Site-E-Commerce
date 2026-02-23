import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import logo from "../assets/tof/logo.svg"
import { Search } from 'lucide-react';
const Navbar = () => {
    const linkStyles = ({ isActive }) =>
        isActive ? 'text-gray-500 font-bold' : 'text-black hover:text-gray-400 transition-colors';

    return (
        <header className='bg-white shadow-md'>
            < >
                <div className='py-4'>
                    <ul className='container mx-auto flex flex-wrap justify-between md:flex-row px-4 items-center'>
                        <div className='flex gap-6'>
                            <li>
                                <NavLink to="/" className={linkStyles}>Accueil</NavLink>
                            </li>
                            <li>
                                <NavLink to="/a-propos" className={linkStyles}>A propos</NavLink>
                            </li>
                            <li>
                                <NavLink to="/faqs" className={linkStyles}>FAQs</NavLink>
                            </li>
                            <li>
                                <NavLink to="/contact" className={linkStyles}>Contact</NavLink>
                            </li>
                        </div>
                    </ul>
                </div>

                <nav className='flex justify-between items-center container mx-auto md:py-6 py-8 px-2'>
                    <div className='flex items-center'>
                        <Link to="/" className="inline-block">
                            <div className="bg-[#2d3748] px-6 py-3 rounded-lg shadow-lg transform transition hover:scale-105">
                                <h1 className="text-white text-xl md:text-2xl font-semibold tracking-wide flex items-center gap-2">
                                    <span className="font-serif italic">MurieL</span>
                                    <span className="uppercase text-sm tracking-[0.2em] font-light border-l border-gray-500 pl-3 ml-1">
                                        Luxury Beauty
                                    </span>
                                </h1>
                            </div>
                        </Link>
                    </div>

                    <form className='w-full max-w-xl flex items-center gap-2'>
                        <div className='relative w-full'>
                            <input
                                type="text"
                                placeholder='Rechercher vos produits'
                                className='bg-zinc-100 rounded-md border border-zinc-200 focus:outline-none focus:ring-1 focus:ring-gray-400 py-3 px-4 w-full'
                            />
                        </div>

                        <button
                            type="submit"
                            className='bg-gray-800 text-white p-3 rounded-md hover:bg-gray-700 transition-colors'
                        >
                            <Search size={20} />
                        </button>
                    </form>
                </nav>

            </>
        </header>
    )
}

export default Navbar
