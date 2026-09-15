import React from 'react'
import {products} from '../data.js'
import FarmProduct from '../components/FarmProduct.jsx'

const ProductPage = () => {
  return (
    <div>
    <div style={{border : '2px solid black',borderRadius: '10px'}}>
           <h2>
            Farm Products 
            </h2> 
        </div>
     
      {products.map((e, i) => (<FarmProduct key={i} {...e} />))}
      </div>
  )
}

export default ProductPage