import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Search, Loader2, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from "../components/LanguageSwitcher";
const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const { t } = useTranslation();

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchTerm.trim().length >= 2) {
        setIsSearching(true);
        try {
          const res = await axios.get(`http://localhost:5000/api/product/search?q=${searchTerm}`);
          setResults(res.data.slice(0, 5));
          setShowDropdown(true);
        } catch (err) {
          console.error("Erreur live search", err);
        } finally {
          setIsSearching(false);
        }
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setShowDropdown(false);
    }
  };

  const linkStyles = ({ isActive }) =>
    isActive ? 'text-gray-500 font-bold' : 'text-black hover:text-gray-400 transition-colors';

  return (
    <header className='bg-white shadow-md relative z-[100]'>
      <div className='py-4 border-b border-zinc-50'>
        <ul className='container mx-auto flex gap-6 px-4'>
          <li><NavLink to="/" className={linkStyles}>{t("home")}</NavLink></li>
          <li><NavLink to="/a-propos" className={linkStyles}>{t("about")}</NavLink></li>
          <li><NavLink to="/faqs" className={linkStyles}>{t("faqs")}</NavLink></li>
          <li><NavLink to="/contact" className={linkStyles}>{t("contact")}</NavLink></li>
          <div className='ml-220'>
            <LanguageSwitcher /> 
          </div>
        </ul>
        
      </div>
    
      <nav className='flex justify-between items-center container mx-auto md:py-6 py-8 px-2 gap-4'>
        <Link to="/" onClick={() => window.scrollTo(0, 0)}>
          <div className="bg-[#2d3748] px-6 py-3 rounded-lg shadow-lg transform transition hover:scale-105 inline-block">
            <h1 className="text-white text-xl md:text-2xl font-semibold tracking-wide flex items-center gap-2">
              <span className="font-serif italic">MurieL</span>
              <span className="uppercase text-[10px] tracking-[0.2em] font-light border-l border-gray-500 pl-3 ml-1">
                {t("luxury_beauty")}
              </span>
            </h1>
          </div>
        </Link>

        <div className='w-full max-w-xl relative' ref={dropdownRef}>
          <form onSubmit={handleSearchSubmit} className='flex items-center gap-2'>
            <div className='relative w-full'>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => searchTerm.length >= 2 && setShowDropdown(true)}
                placeholder={t("search_placeholder2")}
                className='bg-zinc-100 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-[#2d3748]/20 py-3 px-4 w-full pr-10'
              />
              <div className='absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400'>
                {isSearching ? <Loader2 size={18} className='animate-spin' /> : searchTerm && <X size={18} className='cursor-pointer' onClick={() => setSearchTerm("")} />}
              </div>
            </div>
            <button type="submit" className='bg-[#2d3748] text-white p-3 rounded-xl hover:bg-slate-700 transition-all'>
              <Search size={20} />
            </button>
          </form>
           
          {showDropdown && results.length > 0 && (
            <div className='absolute top-full left-0 right-0 mt-2 bg-white shadow-2xl rounded-2xl border border-zinc-100 overflow-hidden animate-in fade-in slide-in-from-top-2'>
              <div className='p-2'>
                {results.map((product) => (
                  <Link
                    key={product.id}
                    to={`/search?q=${searchTerm}`}
                    onClick={() => setShowDropdown(false)}
                    className='flex items-center gap-4 p-3 hover:bg-zinc-50 rounded-xl transition-colors group'
                  >
                    <div className='w-12 h-12 rounded-lg overflow-hidden bg-zinc-100 shrink-0'>
                      <img src={product.Images?.[0]?.url} alt="" className='w-full h-full object-cover' />
                    </div>
                    <div className='flex-1'>
                      <h4 className='text-sm font-bold text-zinc-800 group-hover:text-blue-600 transition-colors'>{product.name}</h4>
                      <p className='text-[10px] text-zinc-400 uppercase font-black'>{product.price.toLocaleString()} FCFA</p>
                    </div>
                    <div className='text-[10px] bg-zinc-100 px-2 py-1 rounded text-zinc-500 font-bold'>
                      {product.Category?.name}
                    </div>
                  </Link>
                ))}
              </div>
              <button
                onClick={handleSearchSubmit}
                className='w-full p-3 bg-zinc-50 text-center text-xs font-bold text-[#2d3748] hover:bg-zinc-100 border-t border-zinc-100'
              >
                {t("view_all_results")} "{searchTerm}"
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
