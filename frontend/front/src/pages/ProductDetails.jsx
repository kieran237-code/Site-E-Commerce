import React from 'react'
import { ShoppingBag, ArrowLeft } from 'lucide-react'
import { Link, useParams } from "react-router-dom"
import products from '../productsContent'
import Footer from '../components/Footer'

const ProductDetails = () => {

  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Produit introuvable</h2>
        <Link to="/" className="text-blue-600 hover:underline">Retour à l'accueil</Link>
      </div>
    );
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div>
        <Link to="/" className='mb-8 inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors'>
          <ArrowLeft size={20} />
          Retour aux Produits
        </Link>
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-12 items-start'>
          <div className='shadow-xl p-2 rounded-2xl bg-white'>
            <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-auto rounded-xl object-cover"
            />
          </div>
          <div className="py-4">
            {product.is_new === "oui" && (
                <span className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-2 block">Nouveauté</span>
            )}
            <h1 className='text-4xl font-bold mb-4 text-[#2d3748]'>{product.name}</h1>
            <p className='text-gray-600 mb-8 leading-relaxed text-lg'>
                {product.description}
            </p>
            
            <div className='mb-8'>
              <span className='text-3xl font-bold text-[#2d3748]'>{product.price.toLocaleString()} FCFA</span>
            </div>

            <div className='mb-6'>
              <h3 className='font-semibold text-sm text-gray-500 uppercase mb-2'>Categorie</h3>
              <span className='inline-block bg-gray-200 rounded-full px-3 py-1 text-sm'>{product.category}</span>
              
            </div>

            <button className='w-full md:w-auto bg-[#2d3748] text-white px-10 py-4 rounded-md flex items-center justify-center gap-3 hover:bg-slate-700 transition-all shadow-lg active:scale-95'>
              <ShoppingBag size={22}/>
              Commander ce Produit
            </button>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default ProductDetails