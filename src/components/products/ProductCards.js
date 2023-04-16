import React from 'react'
import { Link } from 'react-router-dom'

const ProductCards = ({item}) => {
    const {productName,productImages,id,variants} = item || {}
  return (
    <div className="card" >
    <div className='image-container'>
        <img className="card-img-top img-fluid"
           src={`${productImages[0]}`} 
           alt={productName}
        />
    </div>
    <div className="card-body">
    <h6 className="card-text">{productName}</h6>
    <p>Price: {variants && variants[0]?.price}</p>
     <Link to={`/productdetails/${id}`}>Product Details...</Link>
    </div>
 </div>
  )
}

export default ProductCards