import React from 'react'
import products from "../productsContent"
import ProductCard from './ProductCard'
const ProductGrid = () => {
    
  return (
    <div className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16 my-24'>
      {
        products.map((product)=>{
            return <ProductCard key={product.id} product={product}/>;
        })
      }
    </div>
  )
}

export default ProductGrid
 