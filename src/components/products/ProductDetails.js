import React,{useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch ,useSelector } from 'react-redux'
import { fetchProductDetails } from '../../features/category/ProductDetailSlice'
import Loading from '../Loading'
import Error from '../Error'


const ProductDetails = () => {
    
    const id = useParams()
    const sendid = id?.id

    const dispatch = useDispatch()
    const data = useSelector(state => state.productDetails.data);
    const isLoading = useSelector(state => state.productDetails.isLoading);
    const error = useSelector(state => state.productDetails.error);


    useEffect(() => {
      dispatch(fetchProductDetails(sendid))
    }, [sendid,dispatch])
    //
    if (isLoading) {
        return(<Loading/>)
      }
    
      if (error) {
        return <Error error={error}/>
      }
    //

    //
  return (
    <div className='row pt-4 pb-4 mt-4 mb-4 justify-content-center'>
        <h2 className='primary text-center mb-4'>ProductDetails</h2>
        {
        data &&<div className='col-lg-8 align-items-center col-12'>
                    <div className="card" >
                            <div className='image-container singleProduct'>
                                <img className="card-img-top img-fluid"
                                src={`${data?.productImages[0]}`} 
                                alt={data.productName}
                                />
                            </div>
                            <div className="card-body">
                                <h4 className='info mb-2'>{data.productName}</h4>
                            <p className="card-text">{data.description ? data.description : 'Product Details' }</p>
                            </div>
                    </div>
              </div>
        }
    </div>
  )
}

export default ProductDetails