import { FaFacebookF, FaWhatsapp, FaTiktok } from 'react-icons/fa';
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Footer = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    const handleFooterSearch = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
            setSearchTerm("");
            window.scrollTo(0, 0); 
        }
    };

    return (
        <footer className='bg-slate-900 shadow-md'>
        
            <div className='container mx-auto px-4'>
                <div className='min-h-16'>
                    <div className='flex justify-between items-center flex-col md:flex-row py-10'>
                        <h2 className='text-4xl font-bold text-white max-w-xl'>Recherchez-vous un produit spécifique ?</h2>
                        <form onSubmit={handleFooterSearch} className='md:w-1/3 w-full mt-8 md:mt-0 relative'>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder='Entrez ce dont vous avez besoin'
                                className='py-4 px-4 pr-24 rounded shadow-md w-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
                            />
                            <button type="submit" className='bg-slate-800 text-white py-2 px-4 rounded-lg absolute right-2 top-2 hover:bg-slate-700 transition-colors'>
                                Envoyer
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <div className='bg-slate-800 text-white py-10'>
                <div className='container mx-auto px-4'>
                   
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-12 w-full'>
                        
                        <div className='flex flex-col md:items-start'>
                            <Link to="/" onClick={() => window.scrollTo(0,0)}>
                                <div className="bg-[#2d3748] px-6 py-3 rounded-lg shadow-lg transform transition hover:scale-105 inline-block">
                                    <h1 className="text-white text-xl md:text-2xl font-semibold tracking-wide flex items-center gap-2">
                                        <span className="font-serif italic">MurieL</span>
                                        <span className="uppercase text-[10px] tracking-[0.2em] font-light border-l border-gray-500 pl-3 ml-1">
                                            Luxury Beauty
                                        </span>
                                    </h1>
                                </div>
                            </Link>
                            <p className='mt-6 text-gray-400 text-sm leading-relaxed max-w-xs'>
                                Votre destination ultime pour l'élégance et le luxe. Nous sélectionnons les meilleures pièces pour votre beauté.
                            </p>
                            <div className='flex gap-4 mt-6'>
                                <a href="#" className='p-2 bg-slate-700 rounded-full hover:bg-blue-600 transition-colors'><FaFacebookF /></a>
                                <a href="https://wa.me/237697284828" className='p-2 bg-slate-700 rounded-full hover:bg-green-600 transition-colors'><FaWhatsapp /></a>
                                <a href="#" className='p-2 bg-slate-700 rounded-full hover:bg-black transition-colors'><FaTiktok /></a>
                            </div>
                        </div>

                       
                        <div className='md:text-center'>
                            <h2 className='text-lg font-bold mb-6 border-b border-gray-700 pb-2 inline-block'>Pages</h2>
                            <ul className='space-y-3 text-gray-400'>
                                <li><Link to="/" className='hover:text-white transition-colors'>Accueil</Link></li>
                                <li><Link to="/a-propos" className='hover:text-white transition-colors'>À propos</Link></li>
                                <li><Link to="/faqs" className='hover:text-white transition-colors'>FAQs</Link></li>
                                <li><Link to="/contact" className='hover:text-white transition-colors'>Contact</Link></li>
                            </ul>
                        </div>

                      
                        <div className='md:text-right flex flex-col md:items-end'>
                            <h2 className='text-lg font-bold mb-6 border-b border-gray-700 pb-2 inline-block'>Contact</h2>
                            <p className='text-gray-400 text-sm mb-4 max-w-xs'>
                                Nous sommes présents dans toutes les villes et nous livrons n'importe quand.
                            </p>
                            <div className='text-xl font-black text-white bg-slate-700 inline-block px-4 py-2 rounded-lg'>
                                +237 697 284 828
                            </div>
                            <p className='text-xs text-gray-500 mt-2 italic'>Service client disponible 24h/7j</p>
                        </div>

                    </div>
                </div>
            </div>

         
            <div className='container mx-auto text-center py-6 text-gray-500 text-sm border-t border-slate-800'>
                <p>
                   &copy; {new Date().getFullYear()} Muriel Luxury Beauty. Tous droits réservés. Fait avec ❤️ pour vos achats.
                </p>
            </div>
        </footer>
    )
}

export default Footer


