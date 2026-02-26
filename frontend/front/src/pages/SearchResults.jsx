import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { Loader2, SearchX, ArrowLeft, Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard'; 
const SearchResults = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('q');

    useEffect(() => {
        const fetchResults = async () => {
            if (!searchTerm) return;
            
            try {
                setLoading(true);
            
                const res = await axios.get(`http://localhost:5000/api/product/search?q=${searchTerm}`);
                setProducts(res.data);
            } catch (err) {
                console.error("Erreur recherche:", err);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [searchTerm]);

    if (loading) return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-[#2d3748]" size={40} />
            <p className="text-zinc-400 font-medium">Recherche en cours pour "{searchTerm}"...</p>
        </div>
    );

    return (
        <div className="container mx-auto px-4 py-12 animate-in fade-in duration-500">
          
            <div className="mb-12 border-b border-zinc-100 pb-8">
                <Link to="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-[#2d3748] mb-6 transition-colors text-sm font-bold uppercase tracking-widest">
                    <ArrowLeft size={16} /> Boutique
                </Link>
                <h1 className="text-4xl font-black text-[#2d3748] flex items-center gap-4">
                    Résultats pour <span className="text-blue-600 font-serif italic">"{searchTerm}"</span>
                </h1>
                <p className="text-zinc-400 mt-2">
                    {products.length} {products.length > 1 ? 'articles trouvés' : 'article trouvé'}
                </p>
            </div>

            {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
            
                <div className="max-w-2xl mx-auto text-center py-24 bg-zinc-50 rounded-[3rem] border-2 border-dashed border-zinc-200">
                    <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-sm mb-6">
                        <SearchX size={32} className="text-zinc-300" />
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-800 uppercase tracking-tighter">Aucun résultat</h2>
                    <p className="text-zinc-500 mt-3 px-8 italic">
                        Nous n'avons trouvé aucun produit correspondant à votre recherche. Essayez avec un autre mot ou une autre couleur.
                    </p>
                    <Link 
                        to="/" 
                        className="mt-8 inline-block bg-[#2d3748] text-white px-10 py-4 rounded-2xl font-bold hover:bg-slate-700 transition-all shadow-xl active:scale-95"
                    >
                        Retourner à l'accueil
                    </Link>
                </div>
            )}
        </div>
    );
};

export default SearchResults;