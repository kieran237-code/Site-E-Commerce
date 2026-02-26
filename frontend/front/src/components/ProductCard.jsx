import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  
  const mainImage = product.Images && product.Images.length > 0 
    ? product.Images[0].url 
    : 'https://via.placeholder.com/400x500?text=Aucune+Image';

  return (
    <Link to={`/products/${product.slug}`} className="group">
        <div className='bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-zinc-100'>
            
            <div className='h-72 overflow-hidden relative'>
                <img 
                    src={mainImage} 
                    alt={product.name}
                    className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500' 
                />

                <div className="absolute top-3 left-3 flex flex-col gap-2">
   
                    {product.is_new && (
                        <span className="bg-orange-400 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">
                            NOUVEAU
                        </span>
                    )}

                    {product.is_promo && (
                        <span className="bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">
                            PROMOTION
                        </span>
                    )}

                    {product.is_popular && (
                        <span className="bg-blue-400 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg border border-white/20">
                            POPULAIRE
                        </span>
                    )}
                </div>
            </div>

            <div className='p-5'>
                <div className="flex justify-between items-start mb-1">
                    <h2 className='text-md font-bold text-zinc-800 truncate pr-2'>{product.name}</h2>
                    <span className="text-[10px] text-zinc-400 font-bold uppercase">{product.color}</span>
                </div>
                
               
                <p className="text-[10px] text-blue-500 font-bold uppercase mb-2">
                    {product.Category?.name}
                </p>

                <p className='text-xs text-zinc-500 mb-4 line-clamp-2'>
                    {product.description || "Élégance et style pour votre quotidien."}
                </p>

                <div className='flex justify-between items-center pt-4 border-t border-zinc-50'>
                    <div>
                        <p className='text-[10px] text-zinc-400 font-bold uppercase'>Prix</p>
                        <p className='text-lg font-black text-[#2d3748]'>
                            {Number(product.price).toLocaleString()} <span className="text-xs">FCFA</span>
                        </p>
                    </div>
                    <div className="bg-zinc-100 p-2 rounded-lg group-hover:bg-[#2d3748] group-hover:text-white transition-colors">
                        <span className='text-[10px] font-bold uppercase'>Détails</span>
                    </div>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default ProductCard