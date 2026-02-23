import { FaFacebookF, FaWhatsapp, FaTiktok } from 'react-icons/fa';
import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <footer className='bg-slate-900 shadow-md'>
            <div className='container mx-auto px-4'>
                <div className='min-h-16'>
                    <div className='flex justify-between items-center flex-col md:flex-row py-10'>
                        <h2 className='text-4xl font-bold text-white'>Recherchez vous un produit specifique</h2>
                        <form className='md:w-1/3 w-full mt-8 md:mt-0 relative'>
                            <input
                                type="text"
                                placeholder='Entrez ce dont vous avez besoin'
                                className='py-4 px-4 rounded shadow-md w-full bg-gray-200'
                            />
                            <button className='bg-gray-400 py-3 px-4 rounded-full absolute right-3 top-1'>
                                Envoyez
                            </button>
                        </form>
                    </div>
                </div>
            </div>


            <div className='bg-slate-800 text-white py-8'>
                <div className='container mx-auto px-4'>
                    <div className='grid grod-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 '>
                        <div>
                            <Link to="/" className="inline-block">
                                <div className="bg-[#2d3748] px-6 py-3 rounded-lg shadow-lg transform transition hover:scale-105 mt-10 ">
                                    <h1 className="text-white text-xl md:text-2xl font-semibold tracking-wide flex items-center gap-2">
                                        <span className="font-serif italic">MurieL</span>
                                        <span className="uppercase text-sm tracking-[0.2em] font-light border-l border-gray-500 pl-3 ml-1">
                                            Luxury Beauty
                                        </span>
                                    </h1>
                                </div>
                            </Link>
                         
                        </div>
                        <div>
                            <h2 className='text-2xl font-semibold my-4'>Pages</h2>
                            <ul>
                                <li>
                                    <Link to="/">Accueil</Link>
                                </li>
                                <li>
                                    <Link to="/a-propos">A propos</Link>
                                </li>
                                <li>
                                    <Link to="/faqs">FAQs</Link>
                                </li>
                                <li>
                                    <Link to="/contact">Contact</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                             <h2 className='text-2xl font-semibold my-4'>Categories</h2>
                            <ul>
                                <li>
                                    <Link to="/">Sacs</Link>
                                </li>
                                <li>
                                    <Link to="/">Parfums</Link>
                                </li>
                                <li>
                                    <Link to="/">Chaussures</Link>
                                </li>
                                <li>
                                    <Link to="/">Bijoux</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className='text-2xl font-semibold my-4'></h2>
                            <p>
                                Nous sommes present dans toutes les villes et nous livrons n'importe quand
                            </p>
                            <p>+237 694 907 134</p>
                        </div>
                    </div>

                </div>

            </div>
            <div className='container mx-auto text-center py-4 text-white'>
                <p>
                   &copy; 2026 Muriel Luxury Beauty. Tous droits réservés. Fait avec ❤️ pour vos achats.
                </p>
            </div>
        </footer>
    )
}

export default Footer
