import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({product}) => {
  return (
    <Link to={`/product/${product.id}`}>
        <div className='shadow-lg rounded-md cursor-pointer'>
            <img src={product.image} />
            <div className='bg-gray-50 p-4'>
                <h2 className='text-lg font-semibold my-4'>{product.name}</h2>
                <p className='text-sm text-zinc-500 border-b-2 pb-2'>{product.description.substring(0,70)+"..." }</p>
                <div className='flex justify-between mt-4 items-center'>
                    <p className='text-xl font-semibold'>{product.price}Fcfa</p>
                    <p>Voir les details</p>
                </div>
            </div>
        </div>
    </Link>
  )
}

export default ProductCard
