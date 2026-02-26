import React, { useState, useEffect } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import { Loader2 } from 'lucide-react'

const ProductGrid = ({ selectedCategory }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
            
                const res = await axios.get('http://localhost:5000/api/products');
                setProducts(res.data);
            } catch (err) {
                console.error("Erreur API produits:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    
    const filteredProducts = products.filter(product => {
        if (selectedCategory === "Tous") return true; 
        return product.Category?.name === selectedCategory;
    });

    if (loading) return (
        <div className="flex justify-center my-24"><Loader2 className="animate-spin text-zinc-300" size={40} /></div>
    );

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 my-24'>
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))
            ) : (
                <div className="col-span-full text-center py-20 bg-zinc-50 rounded-3xl border-2 border-dashed border-zinc-200">
                    <p className="text-zinc-400 italic font-serif text-lg">
                        Aucun produit disponible dans la catégorie "{selectedCategory}" pour le moment.
                    </p>
                </div>
            )}
        </div>
    )
}

export default ProductGrid