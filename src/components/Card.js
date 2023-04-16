import React from 'react'
import { staticProdo } from '../api'
import { Link } from 'react-router-dom'


const Card = ({item}) => {
    const {id,categoryName,categoryImages,description} = item || {}
  return (
     <div className="card" >
        <div className='image-container'>
            <img className="card-img-top img-fluid"
               src={`${staticProdo}${categoryImages[0]}`} 
               alt={categoryName}
            />
        </div>
        <div className="card-body">
        <p className="card-text">{description}</p>
         <Link to={`product/${id}`}>{categoryName}</Link>
        </div>
     </div>
  )
}

export default Card